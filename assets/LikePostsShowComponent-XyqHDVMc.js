import{_ as a,q as n,s as r,m as c,b as p,e as t,f as i,k as m,o as d,p as l,h as _,r as u}from"./index-kcKp1YGI.js";import{l as o}from"./likesStore-B1K6OqES.js";import f from"./PostAreaComponent-OJGpKM3F.js";import"./postsStore-sSxCOlG3.js";const h={components:{PostAreaComponent:f},data(){return{currentUserData:JSON.parse(n.get("MetaWall_user"))}},computed:{...r(o,["likes"])},methods:{...c(o,["getLikes"])},created(){this.getLikes(void 0,void 0,this.$route.params.likePostId)}},k=e=>(l("data-v-fc00056c"),e=e(),_(),e),S=k(()=>t("section",{class:"title position-relative d-flex justify-content-center align-items-center mb-5"},[t("h3",null,"我按讚的貼文")],-1));function g(e,C,I,P,$,v){const s=u("PostAreaComponent");return d(),p(m,null,[S,t("section",null,[i(s)])],64)}const N=a(h,[["render",g],["__scopeId","data-v-fc00056c"]]);export{N as default};