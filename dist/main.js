(()=>{"use strict";const t=(t="New List")=>{let e=[];return{name:t,taskList:e,addTask:t=>{e.push(t)},removeTask:t=>{e.splice(t,1)}}},e=(t,e=new Date,n=0,a=!1)=>{let d={description:t,dueDate:e,priority:n,status:a,modify:{description(t){""!==t&&null!==t&&(d.description=t)},dueDate(t){if(t<Date.now())throw Error("Due date cannot be in the past.");d.dueDate=t},priority(t){d.priority=t},status(t){d.status=t}}};return d},n=document.getElementById("content"),a=document.createElement("button");a.textContent="+",a.classList.add("add-task-button"),a.addEventListener("click",(()=>{let t=prompt("Enter task description:"),a=prompt("Enter due date (YYYY-MM-DD):"),o=prompt("Set priority (0-2):");const s=e(t,new Date(a),o);d.addTask(s);const i=document.createElement("p");i.textContent=s.description,n.appendChild(i);const r=document.createElement("table"),c=document.createElement("tr"),p=document.createElement("td"),m=document.createElement("td"),l=document.createElement("td"),u=document.createElement("td");document.createElement("button"),p.textContent=s.description,m.textContent=s.dueDate,l.textContent=s.priority,u.textContent=s.status,c.appendChild(p),c.appendChild(m),c.appendChild(l),c.appendChild(u),r.appendChild(c),n.appendChild(r)})),n.appendChild(a);const d=t("My List"),o=t("New List"),s=e("Work",new Date(2026,5,21),1),i=e("Play",new Date(2026,5,21),1),r=e("Due",new Date(2026,5,21),1),c=e("Today",new Date(2026,5,21),1),p=e("Item",new Date(2026,5,21),1),m=e("Object",new Date(2026,5,21),1),l=e("Thing",new Date(2026,5,21),1),u=e("Stuff",new Date(2026,5,21),1);d.addTask(s),d.addTask(i),d.addTask(r),d.addTask(c),o.addTask(p),o.addTask(m),o.addTask(l),o.addTask(u),s.modify.description("Work on project"),i.modify.dueDate(new Date(2026,8,22)),r.modify.priority(2),c.modify.status(!0),o.removeTask(0),d.removeTask(2),console.table(d.taskList),console.table(o.taskList)})();