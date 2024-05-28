import{m as h,u as w,_ as b,o as f,b as v,e as t,f as s,w as e,j as C,t as y,n as m,k as P,r as u,p as x,h as g,q as B}from"./index-whPr3vNV.js";import{p as D}from"./postsStore-EsgWh2CI.js";const U={name:"NavbarComponent",data(){return{isPopPanal:!1}},props:{currentUserData:{type:Object,required:!0}},methods:{...h(w,["logout"]),logoutBtn(){this.logout(),this.$router.push("/login")}}},_=n=>(x("data-v-a012fdd8"),n=n(),g(),n),$={class:"container position-relative"},S=_(()=>t("h4",{class:"logo text-center"},"MetaWall",-1)),M={class:"position-relative"},N={class:"imgContainer mx-1"},A=["src"],W={class:"userName"},I={class:"m-0"},j=_(()=>t("button",{class:"m-0 py-1 w-100 text-center"},"我的貼文",-1)),V=_(()=>t("button",{class:"m-0 py-1 w-100 text-center"},"修改個人資料",-1));function z(n,a,d,k,o,p){const c=u("router-link");return f(),v(P,null,[t("nav",{class:"navbar navbar-light position-sticky top-0 mb-1",onClick:a[2]||(a[2]=r=>o.isPopPanal=!1)},[t("div",$,[s(c,{class:"routerLink navbar-brand m-0",to:"/community/postArea"},{default:e(()=>[S]),_:1}),t("div",M,[t("div",{class:"user d-flex",onClick:a[0]||(a[0]=C(r=>o.isPopPanal=!o.isPopPanal,["stop"]))},[t("div",N,[t("img",{src:d.currentUserData.photo,alt:"userPhoto"},null,8,A)]),t("div",W,[t("p",I,y(d.currentUserData.name),1)])]),t("div",{class:m(["popPanal position-absolute end-0",{popPanalActive:o.isPopPanal}])},[s(c,{to:"/community/postArea/"+d.currentUserData._id},{default:e(()=>[j]),_:1},8,["to"]),s(c,{to:"/community/modifyPersonal"},{default:e(()=>[V]),_:1}),t("button",{class:"m-0 py-1 w-100 text-center",onClick:a[1]||(a[1]=r=>p.logoutBtn())},"登出")],2)])])]),t("div",{class:m(["container-fluid popPanalBG position-fixed top-0 mb-1 start-0",{popPanalActive:o.isPopPanal}]),onClick:a[3]||(a[3]=r=>o.isPopPanal=!1)},null,2)],64)}const L=b(U,[["render",z],["__scopeId","data-v-a012fdd8"]]),q={components:{NavbarComponent:L},data(){return{postData:[1,2,3],currentUserData:JSON.parse(B.get("MetaWall_user"))}},methods:{...h(D,["getPosts","patchPosts"])}},i=n=>(x("data-v-7e69f8b5"),n=n(),g(),n),O={class:"container"},R={class:"row mt-5 h-100 position-relative"},E={class:"col-md-8 col-12"},F={class:"col-4 d-md-block d-none"},G={class:"panel p-3"},J=i(()=>t("button",{class:"btn MetaWall_button btnShdow w-100 mt-2",type:"button"},"張貼動態",-1)),H={class:"p-3"},K={class:"imgContainer mx-1 my-2 me-3"},Q=["src"],T={class:"m-0"},X=i(()=>t("div",{class:"icon imgContainer d-flex justify-content-center align-items-center mx-1 my-2 me-3"},[t("i",{class:"bi bi-bell",style:{"font-size":"30px"}})],-1)),Y=i(()=>t("p",{class:"m-0"},"追蹤名單",-1)),Z=i(()=>t("div",{class:"icon imgContainer d-flex justify-content-center align-items-center mx-1 my-2 me-3"},[t("i",{class:"bi bi-hand-thumbs-up",style:{"font-size":"30px"}})],-1)),tt=i(()=>t("p",{class:"m-0"},"按讚名單",-1)),st={class:"phonePanel d-md-none d-block position-fixed"},ot={class:"mx-4"},et={class:"phonePanelBtns d-flex justify-content-around align-items-center"},nt=i(()=>t("i",{class:"bi bi-house-door"},null,-1)),at=i(()=>t("i",{class:"bi bi-bell"},null,-1)),it=i(()=>t("i",{class:"bi bi-hand-thumbs-up"},null,-1)),lt=i(()=>t("i",{class:"bi bi-plus"},null,-1));function ct(n,a,d,k,o,p){const c=u("NavbarComponent"),r=u("RouterView"),l=u("router-link");return f(),v(P,null,[s(c,{currentUserData:o.currentUserData},null,8,["currentUserData"]),t("div",O,[t("div",R,[t("div",E,[s(r)]),t("div",F,[t("section",G,[s(l,{to:"/community/createPost"},{default:e(()=>[J]),_:1}),t("div",H,[s(l,{to:"/community/postArea/"+o.currentUserData._id,class:"panelBtn d-flex align-items-center"},{default:e(()=>[t("div",K,[t("img",{src:o.currentUserData.photo,alt:"userPhoto"},null,8,Q)]),t("p",T,y(o.currentUserData.name),1)]),_:1},8,["to"]),s(l,{to:"/community/followList",class:"panelBtn d-flex align-items-center"},{default:e(()=>[X,Y]),_:1}),s(l,{to:"/community/likePosts",class:"panelBtn d-flex align-items-center"},{default:e(()=>[Z,tt]),_:1})])])])])]),t("div",st,[t("section",ot,[t("div",et,[s(l,{to:"/community/postArea",class:"phonePanelBtn btn MetaWall_button my-2",type:"button"},{default:e(()=>[nt]),_:1}),s(l,{to:"/community/followList",class:"phonePanelBtn btn MetaWall_button my-2",type:"button"},{default:e(()=>[at]),_:1}),s(l,{to:"/community/likePosts",class:"phonePanelBtn btn MetaWall_button my-2",type:"button"},{default:e(()=>[it]),_:1}),s(l,{to:"/community/createPost",class:"phonePanelBtn btn MetaWall_button my-2",type:"button"},{default:e(()=>[lt]),_:1})])])])],64)}const ut=b(q,[["render",ct],["__scopeId","data-v-7e69f8b5"]]);export{ut as default};