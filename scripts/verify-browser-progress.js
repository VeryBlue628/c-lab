async (page) => {
  const base = new URL('./', page.url()).href;
  const context = await page.context().browser().newContext({viewport:{width:1440,height:900}});
  const open = async (hash = '') => {
    const p = await context.newPage();
    await p.goto(base + hash);
    await p.locator('.lesson-tabs').waitFor();
    return p;
  };
  const read = p => p.evaluate(() => new Promise((resolve, reject) => {
    const open = indexedDB.open("c-lab-learning");
    open.onerror = reject;
    open.onsuccess = () => {
      const db = open.result;
      const get = db.transaction("progress").objectStore("progress").get("active");
      get.onsuccess = () => { resolve(get.result); db.close(); };
      get.onerror = reject;
    };
  }));
  const check = (condition, message) => { if (!condition) throw Error(message); };
  const saved = p => p.getByText("已保存到本机", {exact:true}).waitFor();
  const edit = async (p, text) => {
    await p.locator('.cm-content').fill(text);
    await saved(p);
  };
  try {
    const a = await open(), b = await open();
    await a.getByRole('textbox',{name:/标准输入/}).fill("123");
    await edit(a, '/* A draft */');
    await b.getByRole('tab',{name:'知识检测'}).click();
    await saved(b);
    const c = await open();
    await c.locator('.cm-content').waitFor();
    check((await c.locator('.cm-content').textContent()).includes('A draft'), 'A draft lost');
    check(await c.getByRole('textbox',{name:/标准输入/}).inputValue() === '123', 'stdin lost');
    check(await c.getByRole('tab',{name:'知识检测'}).getAttribute('aria-selected') === 'true', 'B tab did not persist');
    const beforeClose = await read(a);
    await c.close();
    check((await read(a)).revision === beforeClose.revision, 'read-only page wrote on close');
    const d = await context.newPage(), e = await context.newPage();
    for (const p of [d,e]) {
      await p.addInitScript(() => { window.BroadcastChannel = undefined; });
      await p.goto(base);
      await p.locator('.cm-content').waitFor();
    }
    await Promise.all([edit(d, '/* D draft */'), edit(e, '/* E draft */')]);
    const conflict = (await read(a)).progress.records['c1-1'].tasks.practice;
    check(new Set([conflict.draft, ...(conflict.draftHistory ?? [])]).has('/* D draft */'), 'D draft lost');
    check(new Set([conflict.draft, ...(conflict.draftHistory ?? [])]).has('/* E draft */'), 'E draft lost');
    const route = await open('#c13-1');
    await route.getByRole('dialog',{name:/地址、间接访问与空指针/}).waitFor();
    check(route.url().endsWith('#c13-1'), 'locked hash replaced');
    await route.getByRole('button',{name:'继续当前课程'}).click();
    check(route.url().endsWith('#c1-1'), 'continue did not restore URL');
    await route.goto(base+'#bad-id');
    await route.getByRole('dialog',{name:'未找到这个课时'}).waitFor();
    await route.getByRole('button',{name:'继续当前课程'}).click();
    await route.goto(base+'#c13-1');
    await route.getByRole('button',{name:'自由探索本课'}).click();
    await route.getByRole('heading',{name:'地址、间接访问与空指针',exact:true}).waitFor();
    check((await route.title()).startsWith('地址、间接访问与空指针'), 'title did not update');
    return { tabIsolation:true, staleCloseZeroWrites:true, conflictVersions:[conflict.draft,...conflict.draftHistory], lockedLink:true };
  } finally { await context.close(); }
}
