import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import styles from "./PopupProvider.module.css";
import { createPortal, flushSync } from "react-dom";

interface IPopupProviderCtx {
	setTriggerRef: Dispatch<SetStateAction<HTMLElement | null>>;
	showPopup: (options: IShowPopup) => void;
}
interface IShowPopup {
	content: JSX.Element;
	defaultStyles?: boolean;
	popupArrow?: boolean;
	x?: number;
	y?: number;
}

const DEFAULT_GAP_BETWEEN_EL_TO_POPUP = 20;
const PopupProviderCtx = createContext<IPopupProviderCtx | null>(null);
export default function PopupProvider({ children }: PropsWithChildren) {
	const [document, setDocument] = useState<Document | null>(null);
	const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
	const [popUpRef, setPopUpRef] = useState<HTMLDivElement | null>(null);
	const [currentpopupOptions, setCurrentPopupOptions] =
		useState<IShowPopup | null>(null);

	const showPopup = useCallback(
		(options: IShowPopup) => {
			if (currentpopupOptions) return setCurrentPopupOptions(null);
			const defaultOptions = {
				...options,
				defaultStyles: options?.defaultStyles || true,
				popupArrow: options?.popupArrow || true,
			};
			setCurrentPopupOptions(defaultOptions);
			const callback = (mutationList: any) => {
				for (const mutation of mutationList) {
					if (
						mutation.addedNodes[0]?.getAttribute("id") === "CustomPopUpWrapper"
					) {
						const popupEl = mutation.addedNodes[0];
						if (!triggerRef) {
							showPopup(options);
							return;
						}
						const coords = getPosBasedOnToolTipPos(
							"right-center",
							popupEl,
							triggerRef
						);
						setCurrentPopupOptions({
							...defaultOptions,
							x: coords.left,
							y: coords.top,
						});
					}
				}
			};
			const targetNode = window.document.querySelector("body")!;
			const config = { attributes: true, childList: true, subtree: true };
			const observer = new MutationObserver(callback);
			observer.observe(targetNode, config);
		},
		[triggerRef, currentpopupOptions]
	);

	useEffect(() => {
		setDocument(window.document);
	}, []);

	useEffect(() => {
		const handleOutSideClick = (e: any) => {
			if (!popUpRef?.contains(e.target) && !triggerRef?.contains(e.target)) {
				setCurrentPopupOptions(null);
			}
		};
		window.addEventListener("click", handleOutSideClick);
		return () => {
			window.removeEventListener("click", handleOutSideClick);
		};
	}, [popUpRef, triggerRef]);

	return (
		<>
			<PopupProviderCtx.Provider value={{ setTriggerRef, showPopup }}>
				{children}
			</PopupProviderCtx.Provider>
			{document &&
				currentpopupOptions &&
				createPortal(
					<div
						id="CustomPopUpWrapper"
						ref={setPopUpRef}
						className={`${styles.popupProvider} ${
							currentpopupOptions?.defaultStyles
								? styles.popupProviderDefaultStyles
								: ""
						} ${
							!currentpopupOptions.popupArrow
								? styles.popupProviderDefaultArrowHide
								: ""
						}`}
						style={{
							top: currentpopupOptions?.y || -500000000000000000000,
							left: currentpopupOptions?.x || -500000000000000000000,
						}}
					>
						{currentpopupOptions?.content}
					</div>,
					document.querySelector("body")!
				)}
		</>
	);
}

export const usePopup = () => {
	const res = useContext(PopupProviderCtx);
	if (!res) throw new Error("PopupProvider not exists");
	return res;
};

type ToolTipPosTypes =
	| "top-center"
	| "top-left"
	| "top-right"
	| "right-center"
	| "right-top"
	| "right-bottom"
	| "bottom-center"
	| "bottom-left"
	| "bottom-right"
	| "left-center"
	| "left-top"
	| "left-bottom";

function getPosBasedOnToolTipPos(
	type: ToolTipPosTypes,
	popupEl: HTMLDivElement,
	triggerRef: HTMLElement
): { left: number; top: number } {
	const {
		top: triggerTopPos,
		left: triggerLeftPos,
		width: triggerWidth,
		height: triggerHeight,
	} = triggerRef.getBoundingClientRect();
	const { height: popUpHeight, width: popupWidth } =
		popupEl.getBoundingClientRect();

	switch (type) {
		case "top-center":
			const topCenterXPos = triggerLeftPos + triggerWidth / 2 - popupWidth / 2;
      popupEl?.classList.remove(styles.leftArrow);
      popupEl?.classList.remove(styles.bottomArrow);
      popupEl?.classList.remove(styles.rightArrow);
			return {
				left:
					topCenterXPos < 0 ? DEFAULT_GAP_BETWEEN_EL_TO_POPUP : topCenterXPos,
				top: triggerTopPos - popUpHeight - DEFAULT_GAP_BETWEEN_EL_TO_POPUP,
			};
		case "top-left":
			const topLeftX = triggerLeftPos;
      popupEl?.classList.remove(styles.leftArrow);
      popupEl?.classList.remove(styles.bottomArrow);
      popupEl?.classList.remove(styles.rightArrow);
			return {
				left: topLeftX < 0 ? DEFAULT_GAP_BETWEEN_EL_TO_POPUP : topLeftX,
				top: triggerTopPos - popUpHeight - DEFAULT_GAP_BETWEEN_EL_TO_POPUP,
			};
		case "top-right":
			const topRightX = triggerLeftPos + triggerWidth - popupWidth;
      popupEl?.classList.remove(styles.leftArrow);
      popupEl?.classList.remove(styles.bottomArrow);
      popupEl?.classList.remove(styles.rightArrow);
			return {
				left: topRightX < 0 ? DEFAULT_GAP_BETWEEN_EL_TO_POPUP : topRightX,
				top: triggerTopPos - popUpHeight - DEFAULT_GAP_BETWEEN_EL_TO_POPUP,
			};
		case "right-center":
			const rightCenterXPos =
				triggerLeftPos + triggerWidth + DEFAULT_GAP_BETWEEN_EL_TO_POPUP;
      popupEl?.classList.remove(styles.rightArrow);
      popupEl?.classList.remove(styles.bottomArrow);
      popupEl?.classList.add(styles.leftArrow);
			return {
				left:
					rightCenterXPos < 0
						? DEFAULT_GAP_BETWEEN_EL_TO_POPUP
						: rightCenterXPos,
				top: triggerTopPos - popUpHeight + triggerHeight / 2,
			};
		case "right-top":
			const rightTopXPos =
				triggerLeftPos + triggerWidth + DEFAULT_GAP_BETWEEN_EL_TO_POPUP;
      popupEl?.classList.remove(styles.rightArrow);
      popupEl?.classList.remove(styles.bottomArrow);
      popupEl?.classList.add(styles.leftArrow);
			return {
				left: rightTopXPos < 0 ? DEFAULT_GAP_BETWEEN_EL_TO_POPUP : rightTopXPos,
				top: triggerTopPos,
			};
		case "right-bottom":
			const rightBottomXPos =
				triggerLeftPos + triggerWidth + DEFAULT_GAP_BETWEEN_EL_TO_POPUP;
      popupEl?.classList.remove(styles.rightArrow);
      popupEl?.classList.remove(styles.bottomArrow);
      popupEl?.classList.add(styles.leftArrow);
			return {
				left:
					rightBottomXPos < 0
						? DEFAULT_GAP_BETWEEN_EL_TO_POPUP
						: rightBottomXPos,
				top: triggerTopPos + triggerHeight - popUpHeight,
			};
		case "bottom-center":
			const bottomCenterXPos =
        triggerLeftPos + triggerWidth / 2 - popupWidth / 2;
			popupEl?.classList.remove(styles.leftArrow);
      popupEl?.classList.remove(styles.rightArrow);
			popupEl?.classList.add(styles.bottomArrow);
			return {
				left:
					bottomCenterXPos < 0
						? DEFAULT_GAP_BETWEEN_EL_TO_POPUP
						: bottomCenterXPos,
				top: triggerTopPos + DEFAULT_GAP_BETWEEN_EL_TO_POPUP + triggerHeight,
			};
		case "bottom-left":
			const bottomLeftXPos =
        triggerLeftPos;
			popupEl?.classList.remove(styles.leftArrow);
      popupEl?.classList.remove(styles.rightArrow);
			popupEl?.classList.add(styles.bottomArrow);
			return {
				left:
					bottomLeftXPos < 0
						? DEFAULT_GAP_BETWEEN_EL_TO_POPUP
						: bottomLeftXPos,
				top: triggerTopPos + DEFAULT_GAP_BETWEEN_EL_TO_POPUP + triggerHeight,
			};
		case "bottom-right":
			const bottomRightXPos =
        triggerLeftPos - popupWidth + triggerWidth;
      popupEl?.classList.remove(styles.leftArrow);
      popupEl?.classList.remove(styles.rightArrow);
			popupEl?.classList.add(styles.bottomArrow);
			return {
				left:
					bottomRightXPos < 0
						? DEFAULT_GAP_BETWEEN_EL_TO_POPUP
						: bottomRightXPos,
				top: triggerTopPos + DEFAULT_GAP_BETWEEN_EL_TO_POPUP + triggerHeight,
			};
    case "left-center":
      const leftCenterXPos =
        triggerLeftPos - (popupWidth + DEFAULT_GAP_BETWEEN_EL_TO_POPUP);
      popupEl?.classList.remove(styles.leftArrow);
      popupEl?.classList.remove(styles.bottomArrow);
      popupEl?.classList.add(styles.rightArrow);
      return {
        left:
          leftCenterXPos < 0
            ? DEFAULT_GAP_BETWEEN_EL_TO_POPUP
            : leftCenterXPos,
        top: triggerTopPos - popUpHeight + triggerHeight / 2,
      };
    case "left-top":
      const leftTopXPos =
        triggerLeftPos - (popupWidth + DEFAULT_GAP_BETWEEN_EL_TO_POPUP);
      popupEl?.classList.remove(styles.leftArrow);
      popupEl?.classList.remove(styles.bottomArrow);
      popupEl?.classList.add(styles.rightArrow);
      return {
        left:
          leftTopXPos < 0
            ? DEFAULT_GAP_BETWEEN_EL_TO_POPUP
            : leftTopXPos,
        top: triggerTopPos,
      };
    case "left-bottom":
      const leftBottomXPos =
        triggerLeftPos - (popupWidth + DEFAULT_GAP_BETWEEN_EL_TO_POPUP);
      popupEl?.classList.remove(styles.leftArrow);
      popupEl?.classList.remove(styles.bottomArrow);
      popupEl?.classList.add(styles.rightArrow);
      return {
        left:
          leftBottomXPos < 0
            ? DEFAULT_GAP_BETWEEN_EL_TO_POPUP
            : leftBottomXPos,
        top: triggerTopPos + triggerHeight - popUpHeight,
      };
		default:
			throw new Error("Please specify a postion for the tooltip");
	}
}
