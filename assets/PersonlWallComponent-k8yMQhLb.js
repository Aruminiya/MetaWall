import{_ as g,q as w,m as p,u as f,b as a,e,t as m,x as U,f as b,k as v,o as r,r as x}from"./index-kcKp1YGI.js";import{p as F}from"./postsStore-sSxCOlG3.js";import C from"./PostAreaComponent-OJGpKM3F.js";import"./likesStore-B1K6OqES.js";const P={components:{PostAreaComponent:C},data(){return{postUserData:void 0,currentUserData:JSON.parse(w.get("MetaWall_user"))}},computed:{isFollowing(){var t;return(t=this.postUserData)==null?void 0:t.follower.some(s=>s.user._id===this.currentUserData._id)}},methods:{...p(F,["getPosts"]),...p(f,["getUser","userFollow","userUnFollow"]),toFollow(){console.log(this.currentUserData._id,this.postUserData._id),this.userFollow(this.currentUserData._id,this.postUserData._id).then(()=>{this.getUser(this.$route.params.id).then(t=>{var s;this.postUserData=(s=t==null?void 0:t.data)==null?void 0:s.data[0],this.getPosts(this.$route.params.id)})})},toUnFollow(){console.log(this.currentUserData._id,this.postUserData._id),this.userUnFollow(this.currentUserData._id,this.postUserData._id).then(()=>{this.getUser(this.$route.params.id).then(t=>{var s;this.postUserData=(s=t==null?void 0:t.data)==null?void 0:s.data[0],this.getPosts(this.$route.params.id)})})}},created(){this.getUser(this.$route.params.id).then(t=>{var s;this.postUserData=(s=t==null?void 0:t.data)==null?void 0:s.data[0],this.getPosts(this.$route.params.id)})}},k={class:"person position-relative d-flex mb-5"},y={class:"user position-relative d-flex align-items-center"},S={class:"imgContainer me-3"},N=["src"],A={class:"userName"},B={class:"m-0"},W={class:"m-0"},$={class:"follweBtn d-flex align-items-center me-3"},M={key:0},V={key:0,type:"button",class:"btn MetaWall_button btnShdow px-4"},q={key:1,type:"button",class:"btn MetaWall_button_yellow btnShdow px-4"};function E(t,s,I,J,o,n){var i,l,d,c,_,h;const u=x("PostAreaComponent");return r(),a(v,null,[e("div",k,[e("div",y,[e("div",S,[e("img",{src:(i=o.postUserData)==null?void 0:i.photo,alt:"userPhoto"},null,8,N)]),e("div",A,[e("p",B,m((l=o.postUserData)==null?void 0:l.name),1),e("p",W,m((c=(d=o.postUserData)==null?void 0:d.follower)==null?void 0:c.length)+" 人追蹤",1)])]),e("div",$,[((_=o.postUserData)==null?void 0:_._id)!==((h=o.currentUserData)==null?void 0:h._id)?(r(),a("div",M,[n.isFollowing?(r(),a("button",q,[e("span",{class:"text-nowrap",onClick:s[1]||(s[1]=D=>n.toUnFollow())},"已追蹤")])):(r(),a("button",V,[e("span",{class:"text-nowrap",onClick:s[0]||(s[0]=D=>n.toFollow())},"追蹤")]))])):U("",!0)])]),b(u)],64)}const H=g(P,[["render",E],["__scopeId","data-v-0d3d1e82"]]);export{H as default};
