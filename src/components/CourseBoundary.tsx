import { Component, type ReactNode } from 'react';
export class CourseBoundary extends Component<{children:ReactNode}, {failed:boolean}> {
  state = {failed:false};
  static getDerivedStateFromError() { return {failed:true}; }
  render() {
    if (this.state.failed) return <main className="course-loading" role="alert"><h1>课程加载失败</h1><p>请检查网络后重试。已保存的学习记录仍在本机。</p><button onClick={()=>location.reload()}>重新加载</button></main>;
    return this.props.children;
  }
}
