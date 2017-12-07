/**
 * Created by john on 2017/12/7.
 */
import request from '../utils/request';
let follows = [
  {key: '1223@qq.com',email: '1223@qq.com',username: 'shea大明星',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
  {key: '223f3@qq.com',email: '223f3@qq.com',username: 'john大明星',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
  {key: '3243@qq.com',email: '3243@qq.com',username: '小馨雨大明星',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
  {key: '1213@qq.com',email: '1213@qq.com',username: 'shea',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
  {key: '2213@qq.com',email: '2213@qq.com',username: 'john',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
  {key: '3213@qq.com',email: '3213@qq.com',username: '小馨雨',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
];

export function getFollows() {

  return follows;
}

/**
 * 删除关注成员
 * @param memberEmails
 */
export function cancelFollow(memberEmails) {
  for(let i=0;i<memberEmails.length;i++){
    follows = delSingleMember(memberEmails[i],follows);
  }
  return true;
}

/**
 * 删除单个成员
 * @param memberEmail
 * @param groupMember
 */
function delSingleMember(memberEmail,groupMember) {
  let delIndex = -1;
  for(let i=0;i<groupMember.length;i++){
    if(groupMember[i].email === memberEmail){
      delIndex = i;
      break;
    }
  }
  groupMember.splice(delIndex,1);

  return groupMember;
}

