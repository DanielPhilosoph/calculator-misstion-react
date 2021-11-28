export default function Button(props) {
  return (
    <button
      id={props.id}
      onClick={() => {
        if (props.text === "X") {
          props.onClick("*");
        } else {
          props.onClick(props.text);
        }
      }}
    >
      {props.text}
    </button>
  );
}
