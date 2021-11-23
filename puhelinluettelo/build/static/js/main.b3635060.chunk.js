(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{17:function(e,n,t){e.exports=t(40)},40:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),u=t(16),o=t.n(u),l=t(6),i=t(2),c=function(e){var n=e.filter,t=e.handleFilterChange;return a.a.createElement(a.a.Fragment,null,"Filter with name ",a.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.addPerson,t=e.newName,r=e.handleNameChange,u=e.newNumber,o=e.handleNumberChange;return a.a.createElement("form",{onSubmit:n},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:t,onChange:r})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:u,onChange:o})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.persons,t=e.removePerson;return a.a.createElement("ul",null,n.map((function(e){return a.a.createElement("li",{key:e.name},e.name," - ",e.number," ",a.a.createElement("button",{onClick:function(){return t(e.id)}},"Delete"))})))},s=function(e){if(null===e.message)return null;var n=e.message.level,t=e.message.msg,r={color:"green",padding:15,border:"3px solid green",borderRadius:5};return"error"===n&&(r={color:"red",padding:15,border:"3px solid red",borderRadius:5}),a.a.createElement("div",{style:r},t)},f=t(3),h=t.n(f),b="/api/persons",p=function(){return h.a.get(b).then((function(e){return e.data}))},v=function(e){return h.a.post(b,e).then((function(e){return e.data}))},g=function(e,n){return h.a.put(b+"/"+e,n).then((function(e){return e.data}))},E=function(e){return h.a.delete(b+"/"+e).then((function(e){return e.data}))},w=function(){var e=Object(r.useState)([]),n=Object(i.a)(e,2),t=n[0],u=n[1],o=Object(r.useState)(""),f=Object(i.a)(o,2),h=f[0],b=f[1],w=Object(r.useState)(""),j=Object(i.a)(w,2),C=j[0],O=j[1],y=Object(r.useState)(""),k=Object(i.a)(y,2),N=k[0],P=k[1],S=Object(r.useState)(null),T=Object(i.a)(S,2),F=T[0],x=T[1];Object(r.useEffect)((function(){p().then((function(e){u(e)}))}),[]);var D=t.filter((function(e){return e.name.toLowerCase().includes(N.toLowerCase())}));return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(s,{message:F}),a.a.createElement("h3",null,"Add a new person:"),a.a.createElement(m,{addPerson:function(e){if(e.preventDefault(),t.some((function(e){return e.name===h}))){var n=t.find((function(e){return e.name===h}));if(n.number!==C){if(window.confirm('Person "'+h+'" is already added in the phonebook. Would you like to update their phone number ('+n.number+" -> "+C+")?")){var r=Object(l.a)(Object(l.a)({},n),{},{number:C});g(n.id,r).then((function(e){u(t.map((function(n){return n.id!==e.id?n:e})))})),x({msg:"Updated person "+h+"'s number to "+C,level:"info"}),setTimeout((function(){x(null)}),3e3)}}else x({msg:'Person "'+h+'" is already added in the phonebook.',level:"error"}),setTimeout((function(){x(null)}),3e3)}else{v({name:h,number:C}).then((function(e){u(t.concat(e))})),x({msg:'Added new person "'+h+'" with number '+C,level:"info"}),setTimeout((function(){x(null)}),3e3)}b(""),O("")},newName:h,handleNameChange:function(e){b(e.target.value)},newNumber:C,handleNumberChange:function(e){O(e.target.value)}}),a.a.createElement("h2",null,"Numbers:"),a.a.createElement(c,{filter:N,handleFilterChange:function(e){P(e.target.value)}}),a.a.createElement(d,{persons:D,removePerson:function(e){var n=e,r=t.find((function(e){return e.id===n}));window.confirm('Do you really want to remove "'+r.name+'" from the phonebook?')&&E(n).then((function(e){u(t.filter((function(e){return e.id!==n}))),x({msg:'Removed person "'+r.name+'"',level:"info"}),setTimeout((function(){x(null)}),3e3)})).catch((function(e){x({msg:'Could not remove "'+r.name+'" since it was not found. Maybe someone else has deleted it?',level:"error"}),u(t.filter((function(e){return e.id!==n}))),setTimeout((function(){x(null)}),3e3)}))}}))};o.a.render(a.a.createElement(w,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.b3635060.chunk.js.map