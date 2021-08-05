import "./GuideMsgModal.scoped.scss"
import Store from "src/reducers/index"
import { useSelector } from "react-redux";
const GuideMsgModal = (props: { [key: string]: any }) => {
  console.log(props);
  const { guideMessage } = useSelector((state: ReturnType<typeof Store>) => {
    return state.modalState
  })
  return <div className="modal">
    <p className="contents" dangerouslySetInnerHTML={{ __html: guideMessage as string }}>
    </p>

    <button className="ok" >확인</button>
  </div>

}
export default GuideMsgModal