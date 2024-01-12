"use strict";(self.webpackChunkmedical_front=self.webpackChunkmedical_front||[]).push([[350],{173:(t,e,n)=>{n.d(e,{Z:()=>a});var i=n(184);const a=function(){return(0,i.jsxs)("div",{className:"header-user",children:[(0,i.jsx)("span",{className:"header-user-name",children:"name"}),(0,i.jsx)("span",{className:"header-user-icon"})]})}},350:(t,e,n)=>{n.r(e),n.d(e,{default:()=>d});var i=n(689),a=n(87),s=n(791),c=n(173),o=n(184);const d=function(t){var e;let{value:n,onHandleData:d}=t;const l=(0,i.s0)(),r=null===(e=(0,i.TH)().state)||void 0===e?void 0:e.id,[h,m]=(0,s.useState)({Patient_cd:"",Patient_nm:"",Region:"",Hospital:"",Sex:"",Age:25,Birth_dt:"",Height:183,Weight:78,Participants:"",Memo:""}),[x,p]=(0,s.useState)([]);function f(t){const e=t.target.innerText;!async function(t){try{const e=await fetch("http://localhost:8000/api/dicom/download",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw Error("\uc11c\ubc84 \uc751\ub2f5 \uc2e4\ud328");{const t=await e.json();t.success?p(t.data):alert(t.msg)}}catch(e){console.error(e.message)}}(r+"/"+e)}return(0,s.useEffect)((()=>{!async function(){try{const t=await fetch("http://localhost:8000/api/patient/detailInfo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({Patient_cd:r})});if(!t.ok)throw Error("\uc11c\ubc84 \uc751\ub2f5 \uc2e4\ud328");{const e=await t.json();e.success?(console.dir(e.data),m({Patient_cd:e.data[0].Patient_cd,Patient_nm:e.data[0].Patient_nm,Region:e.data[0].Region,Hospital:e.data[0].Hospital,Sex:e.data[0].Sex,Age:e.data[0].Age,Birth_dt:e.data[0].Birth_dt,Height:e.data[0].Height,Weight:e.data[0].Weight,Participants:e.data[0].Participants,Memo:e.data[0].Memo})):alert(e.msg)}}catch(t){console.error(t.message)}}(),async function(){try{const t=await fetch("http://localhost:8000/api/dicom/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({Patient_cd:r})});if(!t.ok)throw Error("\uc11c\ubc84 \uc751\ub2f5 \uc2e4\ud328");{const e=await t.json();e.success?p(e.data):alert(e.msg)}}catch(t){console.error(t.message)}}()}),[r]),(0,o.jsxs)("div",{className:"patientInfo",children:[(0,o.jsxs)("header",{className:"patientInfo-header",children:[(0,o.jsx)("h1",{className:"patientInfo-header-title",children:"Patient Registration"}),(0,o.jsx)(a.rU,{className:"patientInfo-header-link",to:"/PatientListD",children:(0,o.jsx)("div",{className:"patientInfo-header-back",children:"Back"})}),(0,o.jsx)(a.rU,{className:"patientInfo-header-link",to:"/PatientListD",onClick:async function(){d({isDelete:!0,code:r}),await async function(){try{const t=await fetch("http://localhost:8000/api/patient/del",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({Patient_cd:r})});if(!t.ok)throw Error("\uc11c\ubc84 \uc751\ub2f5 \uc2e4\ud328");{const e=await t.json();e.success||alert(e.msg)}}catch(t){console.error(t.message)}}()},children:(0,o.jsx)("div",{className:"patientInfo-header-complete",children:"Delete"})}),(0,o.jsxs)("div",{className:"patient-list-header-user",children:[(0,o.jsx)("div",{className:"patient-list-header-user-logout",onClick:function(){l("/")}}),(0,o.jsx)(c.Z,{})]})]}),(0,o.jsxs)("main",{className:"patientInfo-content",children:[(0,o.jsxs)("header",{className:"patientInfo-content-header",children:[(0,o.jsx)("div",{className:"patientInfo-content-header-name",children:h.Patient_nm}),(0,o.jsx)("div",{className:"patientInfo-content-header-name",children:h.Patient_cd}),(0,o.jsxs)("div",{className:"patientInfo-content-header-chat",onClick:function(){l("/VideoChatting")},children:[(0,o.jsx)("div",{className:"patientInfo-content-header-chat-icon"}),(0,o.jsx)("h3",{className:"patientInfo-content-header-chat-title",children:"Go Live Chat"})]})]}),(0,o.jsxs)("div",{className:"patientInfo-content-section",children:[(0,o.jsxs)("div",{className:"patientInfo-content-section-left",children:[(0,o.jsxs)("section",{className:"patientInfo-content-id",children:[(0,o.jsx)("h2",{className:"patientInfo-content-id-title",children:"ID"}),(0,o.jsxs)("div",{className:"patientInfo-content-id-box",children:[(0,o.jsxs)("div",{className:"patientInfo-content-id-box-item",children:[(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-title",children:"Region"}),(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-text",children:h.Region})]}),(0,o.jsxs)("div",{className:"patientInfo-content-id-box-item",children:[(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-title",children:"Hospital"}),(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-text",children:h.Hospital})]}),(0,o.jsxs)("div",{className:"patientInfo-content-id-box-item",children:[(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-title",children:"Sex"}),(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-text",children:h.Sex})]}),(0,o.jsxs)("div",{className:"patientInfo-content-id-box-item",children:[(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-title",children:"Age"}),(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-text",children:h.Age})]}),(0,o.jsxs)("div",{className:"patientInfo-content-id-box-item",children:[(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-title",children:"Birth_dt"}),(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-text",children:h.Birth_dt})]}),(0,o.jsxs)("div",{className:"patientInfo-content-id-box-item",children:[(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-title",children:"Height"}),(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-text",children:h.Height})]}),(0,o.jsxs)("div",{className:"patientInfo-content-id-box-item",children:[(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-title",children:"Weight"}),(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-text",children:h.Weight})]}),(0,o.jsxs)("div",{className:"patientInfo-content-id-box-item",children:[(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-title-last",children:"Participants"}),(0,o.jsx)("div",{className:"patientInfo-content-id-box-item-text",children:h.Participants})]})]})]}),(0,o.jsxs)("section",{className:"patientInfo-content-memo",children:[(0,o.jsx)("h2",{className:"patientInfo-content-memo-title",children:"Memo"}),(0,o.jsx)("div",{className:"patientInfo-content-memo-box",children:h.Memo})]}),(0,o.jsxs)("section",{className:"patientInfo-content-file",children:[(0,o.jsx)("h2",{className:"patientInfo-content-file-title",children:"Files"}),(0,o.jsxs)("div",{className:"patientInfo-content-file-box",children:[(0,o.jsx)("label",{htmlFor:"file",children:(0,o.jsx)("div",{className:"patientInfo-content-file-box-submit"})}),(0,o.jsx)("div",{id:"file",className:"patientInfo-content-file-box-item"}),x.map(((t,e)=>(0,o.jsx)("div",{className:"patientInfo-content-file-box-file",onClick:f,children:t.File_nm},e)))]})]})]}),(0,o.jsxs)("section",{className:"patientInfo-content-section-right",children:[(0,o.jsx)("h2",{className:"patientInfo-content-chat",children:"chat"}),(0,o.jsx)("div",{className:"patientInfo-content-chat-box"})]})]})]})]})}}}]);
//# sourceMappingURL=350.0944e549.chunk.js.map