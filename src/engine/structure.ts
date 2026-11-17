import { parser } from '@lezer/cpp';
export type StructureRule = {
  kind: 'node' | 'call' | 'recursive' | 'nested-loop' | 'operator' | 'directive';
  name?: string;
  min?: number;
  label: string;
};
type Node = ReturnType<typeof parser.parse>['topNode'];
const loops = new Set(['ForStatement','WhileStatement','DoStatement']);
function walk(node: Node, visit: (n:Node)=>void) {
  visit(node);
  for(let child=node.firstChild;child;child=child.nextSibling) walk(child,visit);
}
// Parse syntax, rather than matching text: comments and string literals do not
// count as calls/operators. Only functions reachable by named calls from main
// are counted (plus global declarations). This is a pedagogical structural
// check, not a proof of algorithmic complexity or execution-path coverage.
export function checkStructure(code:string, rules:StructureRule[] = [], files:Record<string,string> = {}) {
  const sources=[code,...Object.entries(files).filter(([n])=>/\.(c|h)$/.test(n)).map(([,s])=>s)];
  const functions = new Map<string,{node:Node,source:string,calls:string[]}>();
  const globals:{node:Node,source:string}[]=[];
  for(const source of sources) {
    const tree=parser.parse(source);
    for(let n=tree.topNode.firstChild;n;n=n.nextSibling) {
      if(n.name==='FunctionDefinition') {
        let declarator:Node|null=null;
        walk(n,x=>{if(!declarator&&x.name==='FunctionDeclarator')declarator=x;});
        let name='';
        if(declarator) walk(declarator,x=>{if(!name&&x.name==='Identifier')name=source.slice(x.from,x.to);});
        const calls:string[]=[];
        walk(n,x=>{if(x.name==='CallExpression'&&x.firstChild?.name==='Identifier')calls.push(source.slice(x.firstChild.from,x.firstChild.to));});
        if(name)functions.set(name,{node:n,source,calls});
      } else globals.push({node:n,source});
    }
  }
  const reachable = new Set<string>();
  const visit=(name:string)=>{if(reachable.has(name)||!functions.has(name))return;reachable.add(name);for(const c of functions.get(name)!.calls)visit(c);};
  visit('main');
  const nodes:{node:Node,source:string}[]=[];
  for(const item of [...globals,...[...reachable].map(n=>functions.get(n)!)])walk(item.node,node=>nodes.push({node,source:item.source}));
  return rules.map(rule=>{
    let count=0;
    if(rule.kind==='recursive') count=[...reachable].filter(n=>(!rule.name||n===rule.name)&&functions.get(n)!.calls.includes(n)).length;
    else for(const {node,source} of nodes) {
      if(rule.kind==='node'&&node.name===rule.name)count++;
      if(rule.kind==='call'&&node.name==='CallExpression'&&node.firstChild?.name==='Identifier'&&source.slice(node.firstChild.from,node.firstChild.to)===rule.name)count++;
      if(rule.kind==='operator'&&/Op$/.test(node.name)&&source.slice(node.from,node.to)===rule.name)count++;
      if(rule.kind==='directive'&&node.name==='PreprocDirective'&&node.firstChild&&source.slice(node.firstChild.from,node.firstChild.to)===rule.name)count++;
      if(rule.kind==='nested-loop'&&loops.has(node.name)) {
        for(let parent=node.parent;parent;parent=parent.parent)if(loops.has(parent.name)){count++;break;}
      }
    }
    return {label:rule.label, passed:count>=(rule.min??1)};
  });
}
