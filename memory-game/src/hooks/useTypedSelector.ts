import { RootState } from "../store/reducers";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
