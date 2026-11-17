import fs from 'node:fs';
const file='src/data/textbook-lessons.json', chapters=JSON.parse(fs.readFileSync(file,'utf8'));
const node=(name,label,min)=>({kind:'node',name,label,min});
const call=(name,min=1)=>({kind:'call',name,min,label:`调用 ${name}${min>1?' 至少 '+min+' 次':''}（检查源码调用点）`});
const loop=node('ForStatement','使用 for 循环');
const nested={kind:'nested-loop',label:'使用嵌套循环'};
const pointer=node('PointerDeclarator','声明指针');
const field=node('FieldExpression','访问结构体或共用体成员');
const recursive={kind:'recursive',label:'在 main 可调用到的函数中使用直接递归'};
const rules={
 'c10-2':[node('WhileStatement','使用循环实现辗转相除'),{kind:'operator',name:'%',label:'使用取余运算'}],
 'c10-3':[{kind:'directive',name:'#if',label:'使用 #if 条件编译'}],
 'c10-5':[call('getchar')], 'c10-7':[node('CommaExpression','使用逗号表达式')],
 'c10-8':[nested], 'c10-9':[loop,call('fabs')],
 'c11-2':[call('fgets')], 'c11-3':[call('strcpy'),call('strcat')], 'c11-4':[call('strcmp')],
 'c12-1':[call('show')], 'c12-2':[node('static','使用 static 存储类别'),call('tick')],
 'c12-3':[call('twice',2)],'c12-4':[call('sum'),nested], 'c12-5':[recursive],
 'c13-1':[pointer,node('PointerExpression','使用指针表达式')],
 'c13-2':[pointer,call('swap')], 'c13-3':[pointer,loop], 'c13-4':[node('PointerExpression','使用指针表达式'),node('ArrayDeclarator','声明数组')],
 'c13-5':[pointer,loop], 'c13-6':[pointer,call('apply'),call('op')],
 'c13-7':[pointer,call('findmin')], 'c13-8':[pointer,call('select_second')],
 'c13-10':[call('calloc'),call('free')], 'c13-11':[call('realloc'),call('free')],
 'c14-1':[node('StructSpecifier','定义结构体'),field], 'c14-2':[node('StructSpecifier','定义结构体记录'),field],
 'c14-3':[pointer,call('move'),field], 'c14-4':[pointer,field],
 'c14-5':[call('malloc'),call('free'),field], 'c14-6':[call('malloc'),call('free'),field],
 'c14-7':[node('UnionSpecifier','使用 union 共用体'),field], 'c14-8':[node('EnumSpecifier','使用 enum 枚举'),node('SwitchStatement','使用 switch 分派状态')],
 'c15-1':[call('fopen'),call('fprintf'),call('fclose')], 'c15-2':[call('fgetc'),call('fputc'),call('fclose')],
 'c15-3':[call('fgets'),call('fclose')], 'c15-4':[call('fscanf'),call('fprintf'),call('fclose')],
 'c15-5':[call('fwrite'),call('fread'),call('fclose')], 'c15-6':[call('fseek'),call('rewind')],
 'c15-7':[call('feof'),call('clearerr'),call('fgetc',2)],
 'c16-1':[{kind:'directive',name:'#define',label:'使用 #define 定义宏'},call('SQUARE')],
 'c16-2':[{kind:'operator',name:'&',label:'使用按位与运算'}], 'c16-3':[call('isspace'),call('ispunct')],
 'c17-1':[call('isspace')], 'c17-2':[loop], 'c17-5':[loop], 'c17-6':[call('perfect')], 'c17-7':[loop],
 'c17-8':[loop,node('IfStatement','使用条件分支更新区间')], 'c17-9':[loop,call('fabs')],
 'c18-1':[node('ArrayDeclarator','声明数组')], 'c18-2':[nested,node('SubscriptExpression','通过下标访问筛表')],
 'c18-3':[call('sort'),nested], 'c18-4':[node('WhileStatement','使用循环缩小二分区间')],
 'c18-5':[nested], 'c18-6':[nested], 'c18-7':[nested], 'c18-8':[nested], 'c18-9':[call('reverse',3)],
 'c19-1':[recursive], 'c19-2':[recursive], 'c19-3':[call('mean')], 'c19-4':[node('StructSpecifier','使用结构体日期'),call('ordinal')],
 'c19-5':[call('malloc'),call('free'),field], 'c19-6':[call('isdigit')],
 'c19-7':[pointer,call('integrate'),call('f')], 'c19-8':[pointer,call('strcmp')],
 'c19-9':[call('isspace'),call('strchr')], 'c20-3':[call('snprintf')], 'c20-4':[call('strtol')],
 'c20-5':[call('strrchr'),call('strstr')], 'c20-6':[call('log'),call('rand')],
 'c20-7':[field,call('before')], 'c20-8':[call('merge'),call('malloc'),call('free')],
 'c20-9':[call('fopen'),call('fflush'),call('fseek'),call('fclose')],
};
for(const l of chapters.flatMap(c=>c.lessons)) l.challenge.structure=rules[l.id]||[];
fs.writeFileSync(file,JSON.stringify(chapters,null,2)+'\n');
console.log('Added method checks to',Object.keys(rules).length,'challenges');
