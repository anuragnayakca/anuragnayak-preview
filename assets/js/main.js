(()=>{
  const menuButton=document.querySelector('[data-menu-button]');
  const mobileMenu=document.querySelector('[data-mobile-menu]');

  if(menuButton&&mobileMenu){
    menuButton.addEventListener('click',()=>{
      const open=menuButton.getAttribute('aria-expanded')==='true';
      menuButton.setAttribute('aria-expanded',String(!open));
      mobileMenu.hidden=open;
      document.body.classList.toggle('menu-open',!open);
      if(!open){const first=mobileMenu.querySelector('a,summary');if(first)first.focus();}
    });
    mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      menuButton.setAttribute('aria-expanded','false');
      mobileMenu.hidden=true;
      document.body.classList.remove('menu-open');
    }));
  }

  const dropdowns=[...document.querySelectorAll('.nav-dropdown')];
  document.addEventListener('click',event=>{
    dropdowns.forEach(drop=>{if(drop.open&&!drop.contains(event.target))drop.open=false;});
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      dropdowns.forEach(drop=>drop.open=false);
      if(mobileMenu&&!mobileMenu.hidden){mobileMenu.hidden=true;menuButton?.setAttribute('aria-expanded','false');menuButton?.focus();}
    }
  });

  const form=document.querySelector('[data-contact-form]');
  if(form){
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      const status=form.querySelector('[data-form-status]');
      const button=form.querySelector('button[type="submit"]');
      if(!form.reportValidity())return;
      status.textContent='Sending your message…';
      button.disabled=true;
      button.setAttribute('aria-busy','true');
      try{
        const payload=Object.fromEntries(new FormData(form).entries());
        const response=await fetch(form.action,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
        const result=await response.json().catch(()=>({}));
        if(!response.ok)throw new Error(result.error||'Unable to send your message.');
        window.location.href='/thank-you/';
      }catch(error){
        status.textContent=error.message||'The message could not be sent. Please email contact@anuragnayak.ca.';
        button.disabled=false;
        button.removeAttribute('aria-busy');
      }
    });
  }

  const grid=document.querySelector('[data-article-grid]');
  if(grid){
    const cards=[...grid.querySelectorAll('[data-article-card]')];
    const search=document.querySelector('[data-article-search]');
    const filters=[...document.querySelectorAll('[data-category]')];
    const loadMore=document.querySelector('[data-load-more]');
    const empty=document.querySelector('[data-search-empty]');
    let active='all',visible=9;

    const render=()=>{
      const q=(search?.value||'').trim().toLowerCase();
      const matches=cards.filter(card=>{
        const category=(card.dataset.category||'').toLowerCase();
        const haystack=`${card.dataset.title||''} ${category} ${card.dataset.tags||''}`;
        return (active==='all'||category===active)&&(!q||haystack.includes(q));
      });
      cards.forEach(card=>card.hidden=true);
      matches.slice(0,visible).forEach(card=>card.hidden=false);
      if(loadMore)loadMore.hidden=matches.length<=visible;
      if(empty)empty.hidden=matches.length!==0;
    };
    search?.addEventListener('input',()=>{visible=9;render();});
    filters.forEach(filter=>filter.addEventListener('click',()=>{
      filters.forEach(b=>b.classList.remove('active'));filter.classList.add('active');
      active=filter.dataset.category||'all';visible=9;render();
    }));
    loadMore?.addEventListener('click',()=>{visible+=9;render();});
    render();
  }
})();
