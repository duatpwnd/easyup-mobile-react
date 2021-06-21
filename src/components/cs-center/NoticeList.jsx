const NoticeList = ({match})=>{
    console.log(match);
 return (
     <div>
     공지사항리스트 {match.params.id}
     </div>
 )
}
export default NoticeList