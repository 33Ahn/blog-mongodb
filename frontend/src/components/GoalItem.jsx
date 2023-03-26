import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function PostItem({ post }) {
    const dispatch = useDispatch()
  return (
    <div className="post">
      <div>{new Date(post.createdAt).toLocaleString("en-US")}</div>
      <h2>{post.text}</h2>
      <button
        onClick={() => dispatchEvent(deleteGoal(post._id))}
        className="close"
      >
        X
      </button>
    </div>
  );
}

export default PostItem;
