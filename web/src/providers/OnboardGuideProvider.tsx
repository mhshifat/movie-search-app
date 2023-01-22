import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import styles from "./OnboardGuide.module.css";
import { createPortal, flushSync } from "react-dom";
import { useRouter } from "next/router";

const OnboardGuideCtx = createContext<any>(null);

const steps = [
  {
    name: "Installation Theme Select Button",
    className: "installationThemeSelectBtn",
    step: 1,
    title: "Choose A Theme and Install",
    subTitle: "The reorder and upsell widgets will be installed on that theme",
    defaultPosition: "bottomRight",
    next: true,
    redirectPath: { pathname: '/settings', search: '?tab=installation&showStep=1', },
    onNext: () => {}
  },
  {
    name: "Dashboard Link",
    className: "skeletonDemo",
    step: 2,
    title: "Perfect",
    subTitle: "Let’s take a quick walkthrough of the Upscribe Reorder app",
    defaultPosition: "leftBottom",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Dashboard Link",
    className: "dashboardNavLink",
    step: 3,
    title: "The Dashboard",
    subTitle: "This is the place to check insights on how well the app is performing",
    defaultPosition: "bottomCenter",
    next: true,
    redirectPath: { pathname: '/', search: '', },
    onNext: () => {}
  },
  {
    name: "Total Revenue Generated",
    className: "totalRevenueGenerated",
    step: 4,
    title: "Tracking Revenue",
    subTitle: "These data points will give a breakdown of how much revenue you are generating from each reorder funnel",
    defaultPosition: "bottomLeft",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Number of Orders",
    className: "numOfOrders",
    step: 5,
    title: "Tracking Orders",
    subTitle: "These data points will give a breakdown of how many products are being reordered via each reorder funnel",
    defaultPosition: "bottomLeft",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Top Products Reordered",
    className: "topProductsReordered",
    step: 6,
    title: "Tracking Products",
    subTitle: "The chart and table under this section shows you which products are being reordered the most by your customers",
    defaultPosition: "bottomLeft",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Reorder Nav",
    className: "reorderNavLink",
    step: 7,
    title: "The Reorder Funnels",
    subTitle: "Let’s quickly hop in and see how each funnel works to get you more sales",
    defaultPosition: "bottomCenter",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Reorder Website",
    className: "reorderWebsiteSubTitle",
    step: 9,
    title: "Reorder Website Widget",
    subTitle: "The reorder widget sits on the My Accounts page of your store",
    defaultPosition: "bottomLeft",
    next: true,
    redirectPath: { pathname: '/reorder', search: '', },
    onNext: () => {}
  },
  {
    name: "Reorder Email",
    className: "reorderEmailSubTitle",
    step: 10,
    title: "Email Funnel",
    subTitle: "If Klaviyo Flow is set up, we can start sending out auto reorder emails to your customers",
    defaultPosition: "bottomLeft",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Reorder SMS",
    className: "reorderSmsSubTitle",
    step: 11,
    title: "SMS Funnel",
    subTitle: "If Klaviyo Flow is set up, we can start sending out auto reorder SMS to your customers",
    defaultPosition: "bottomLeft",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  // {
  //   name: "Reorder Customers",
  //   className: "reorderCustomers",
  //   step: 8,
  //   title: "Reorder - Customers",
  //   subTitle: "Shows the reorders information of customers in a table. The table shows information of 10 customers per page.",
  //   defaultPosition: "bottomCenter",
  //   next: true,
  //   redirectPath: { pathname: '/reorder', search: '', },
  //   onNext: () => {}
  // },
  {
    name: "Reorder Snooze",
    className: "reorderSnooze",
    step: 9,
    title: "Reorder - Delay & Snoozing",
    subTitle: "Here, you can set the intervals for sending reminders and snoozing options you want to give  customers through emails.",
    defaultPosition: "bottomCenter",
    next: true,
    redirectPath: { pathname: '/reorder', search: '', state: { activeTab: 1 } },
    onNext: () => {}
  },
  {
    name: "Email Templates",
    className: "emailTemplatesNavLink",
    step: 8,
    title: "Email Templates",
    subTitle: "Here you can customize and manage the templates you plan to send out to the customers.",
    defaultPosition: "bottomCenter",
    next: true,
    redirectPath: { pathname: '/email-templates', search: '' },
    onNext: () => {}
  },
  {
    name: "Picking Templates",
    className: "pickEmailTemplate",
    step: 8,
    title: "Picking Templates",
    subTitle: "From the Template dropdown you can select a default template. The template preview will show up in the Preview section.",
    defaultPosition: "bottomCenter",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Customizing Template",
    className: "emailTemplateCustomizeTab",
    step: 8,
    title: "Customizing Template",
    subTitle: "You can customize a template under the Customize section and modify email title, subtitle etc. Apart from this, by clicking Edit HTML, you can insert HTML code and generate a custom email template.",
    defaultPosition: "bottomCenter",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Upsell Nav Link",
    className: "upsellNavLink",
    step: 12,
    title: "You Can Also Upsell",
    subTitle: "Let’s quickly hop in and see how upselling works with Upscribe Reorders",
    defaultPosition: "bottomCenter",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Upsell Carousal",
    className: "upsellCarousalSubTitle",
    step: 13,
    title: "Upsell Carousel",
    subTitle: "This is displayed on the Cart page of your store to upsell products",
    defaultPosition: "bottomLeft",
    next: true,
    redirectPath: { pathname: '/cart', search: '', },
    onNext: () => {}
  },
  {
    name: "Upsell Carousal Products",
    className: "cartAccordionHeaderTitle",
    step: 14,
    title: "Select Products To Upsell",
    subTitle: "You can select the products you want to Upsell from here and we will pick 4 of them using our AI algorithm",
    defaultPosition: "bottomLeft",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Upsell Email",
    className: "upsellEmailTab",
    step: 14,
    title: "Upsell Email",
    subTitle: "In this section, you can add relation or default upsell products.",
    defaultPosition: "bottomCenter",
    next: true,
    redirectPath: { pathname: '/cart', search: '', state: { activeTab: 1 } },
    onNext: () => {}
  },
  {
    name: "Upsell Email - Add New Relation",
    className: "upsellEmailTab",
    step: 14,
    title: "Upsell Email - Add New Relation",
    subTitle: "Clicking this opens up a modal, and from there, you can select one or more base products. After selecting base products you can pick up to 4 upsell products and relate them to the base products.",
    defaultPosition: "bottomCenter",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Upsell Email - Pick Default products",
    className: "upsellEmailTab",
    step: 14,
    title: "Upsell Email - Pick Default products",
    subTitle: "Clicking this opens up another modal, and you can pick 4 default products to upsell on your emails.",
    defaultPosition: "bottomCenter",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Edit Existing Relation",
    className: "upsellEmailTab",
    step: 14,
    title: "Edit Existing Relation",
    subTitle: "Click the Edit option for a relation and then select desired products (up to 4) from the modal to upsell.",
    defaultPosition: "bottomCenter",
    next: true,
    redirectPath: null,
    onNext: () => {}
  },
  {
    name: "Settings",
    className: "settingsNavLink",
    step: 14,
    title: "Settings",
    subTitle: "Let’s quickly hop into the Settings page to see what options we have",
    defaultPosition: "bottomRight",
    next: true,
    redirectPath: { pathname: '/settings', search: '' },
    onNext: () => {}
  },
  {
    name: "Appearance",
    className: "settingsApparanceTabLink",
    step: 14,
    title: "Appearance",
    subTitle: "From here you can customize the look and feel of your website widgets",
    defaultPosition: "bottomLeft",
    next: true,
    redirectPath: { pathname: '/settings', search: '', state: { activeTab: 0 } },
    onNext: () => {}
  },
  {
    name: "Site Settings",
    className: "settingsSiteSettingsTabLink",
    step: 14,
    title: "Site Settings",
    subTitle: "From here you can configure Klaviyo and other third party integrations",
    defaultPosition: "bottomCenter",
    next: true,
    redirectPath: { pathname: '/settings', search: '', state: { activeTab: 1 } },
    onNext: () => {}
  },
  {
    name: "Installation",
    className: "settingsInstallationTabLink",
    step: 14,
    title: "Installation",
    subTitle: "If you ever change themes, you can come back to this tab and reinstall the widgets",
    defaultPosition: "bottomRight",
    next: true,
    redirectPath: { pathname: '/settings', search: '', state: { activeTab: 2 } },
    onNext: () => {}
  },
];
const DEFAULT_GAP_BETWEEN_GUIDE_TO_EL = 20;
export default function OnboardGuideProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [stemsState, setStemsState] = useState([...steps]);
  const [document, setDocument] = useState<any>(null);
  const [current, setCurrent] = useState<number>(0);
  const [guideCoord, setGuideCoord] = useState({
    x: -5000000000,
    y: -5000000000
  });
  const guidePosition = useRef<string | null>(null);

  const calculateNextElementPosition = useCallback(async (nextIdx: number) => {
    flushSync(() => {
      setCurrent(value => value + 1);
    })
    const { className, defaultPosition, name } = stemsState[nextIdx];
    const currentGuidePos = guidePosition.current || defaultPosition;
    const el = window.document.querySelector(`.${className}`);
    if (!el) return startFromGuide(nextIdx);
    flushSync(() => {
      window.scrollTo({top: el.getBoundingClientRect().top, behavior: 'smooth'});
    })
    await sleep(1000);
    const { top, left, width: elWidth, height: elHeight } = el.getBoundingClientRect();
    const onboardGuideEl = window.document.querySelector(`.onboardGuide`);
    if (!onboardGuideEl) return startFromGuide(nextIdx);
    const { width: guideWidth, height: guideHeight } = onboardGuideEl.getBoundingClientRect();
    
    if (currentGuidePos === "leftTop") {
      if ((left + 20) < guideWidth) {
        flushSync(() => {
          setStemsState(values => values.map(item => item.name === name ? ({ ...item, defaultPosition: "rightTop" }) : item));
          guidePosition.current = "rightTop";
        });
        return startFromGuide(nextIdx);
      }
      return {
        top: top,
        left: left - (guideWidth + DEFAULT_GAP_BETWEEN_GUIDE_TO_EL)
      }
    }
    if (currentGuidePos === "leftCenter") {
      if ((left + 20) < guideWidth) {
        flushSync(() => {
          setStemsState(values => values.map(item => item.name === name ? ({ ...item, defaultPosition: "rightCenter" }) : item));
          guidePosition.current = "rightCenter";
        });
        return startFromGuide(nextIdx);
      }
      return {
        top: top + (elHeight / 2) - (guideHeight / 2),
        left: left - (guideWidth + DEFAULT_GAP_BETWEEN_GUIDE_TO_EL)
      }
    }
    if (currentGuidePos === "leftBottom") {
      if ((left + 20) < guideWidth) {
        flushSync(() => {
          setStemsState(values => values.map(item => item.name === name ? ({ ...item, defaultPosition: "rightBottom" }) : item));
          guidePosition.current = "rightBottom";
        });
        return startFromGuide(nextIdx);
      }
      return {
        top: top + elHeight - guideHeight,
        left: left - (guideWidth + DEFAULT_GAP_BETWEEN_GUIDE_TO_EL)
      }
    }
    if (currentGuidePos === "topLeft") {
      return {
        top: top - guideHeight - DEFAULT_GAP_BETWEEN_GUIDE_TO_EL,
        left: left
      }
    }
    if (currentGuidePos === "topCenter") {
      return {
        top: top - guideHeight - DEFAULT_GAP_BETWEEN_GUIDE_TO_EL,
        left: left + (elWidth / 2) - (guideWidth / 2)
      }
    }
    if (currentGuidePos === "topRight") {
      return {
        top: top - guideHeight - DEFAULT_GAP_BETWEEN_GUIDE_TO_EL,
        left: left + elWidth - guideWidth
      }
    }
    if (currentGuidePos === "rightTop") {
      if ((window.innerWidth - (left + elWidth + 20)) < guideWidth) {
        flushSync(() => {
          setStemsState(values => values.map(item => item.name === name ? ({ ...item, defaultPosition: "bottomLeft" }) : item));
          guidePosition.current = "bottomLeft";
        });
        return startFromGuide(nextIdx);
      }
      return {
        top: top,
        left: left + elWidth + DEFAULT_GAP_BETWEEN_GUIDE_TO_EL
      }
    }
    if (currentGuidePos === "rightCenter") {
      if ((window.innerWidth - (left + elWidth + 20)) < guideWidth) {
        flushSync(() => {
          setStemsState(values => values.map(item => item.name === name ? ({ ...item, defaultPosition: "bottomCenter" }) : item));
          guidePosition.current = "bottomCenter";
        });
        return startFromGuide(nextIdx);
      }
      return {
        top: top + (elHeight / 2) - (guideHeight / 2),
        left: left + elWidth + DEFAULT_GAP_BETWEEN_GUIDE_TO_EL
      }
    }
    if (currentGuidePos === "rightBottom") {
      if ((window.innerWidth - (left + elWidth + 20)) < guideWidth) {
        flushSync(() => {
          setStemsState(values => values.map(item => item.name === name ? ({ ...item, defaultPosition: "bottomRight" }) : item));
          guidePosition.current = "bottomRight";
        });
        return startFromGuide(nextIdx);
      }
      return {
        top: top + elHeight - guideHeight,
        left: left + elWidth + DEFAULT_GAP_BETWEEN_GUIDE_TO_EL
      }
    }
    if (currentGuidePos === "bottomLeft") {
      if ((window.innerHeight - (top + elHeight + 20)) < guideWidth) {
        flushSync(() => {
          setStemsState(values => values.map(item => item.name === name ? ({ ...item, defaultPosition: "topLeft" }) : item));
          guidePosition.current = "topLeft";
        });
        return startFromGuide(nextIdx);
      }
      return {
        top: top + elHeight + DEFAULT_GAP_BETWEEN_GUIDE_TO_EL,
        left: left
      }
    }
    if (currentGuidePos === "bottomCenter") {
      if ((window.innerHeight - (top + elHeight + 20)) < guideWidth) {
        flushSync(() => {
          setStemsState(values => values.map(item => item.name === name ? ({ ...item, defaultPosition: "topCenter" }) : item));
          guidePosition.current = "topCenter";
        });
        return startFromGuide(nextIdx);
      }
      return {
        top: top + elHeight + DEFAULT_GAP_BETWEEN_GUIDE_TO_EL,
        left: left + (elWidth / 2) - (guideWidth / 2)
      }
    }
    if (currentGuidePos === "bottomRight") {
      if ((window.innerHeight - (top + elHeight + 20)) < guideWidth) {
        flushSync(() => {
          setStemsState(values => values.map(item => item.name === name ? ({ ...item, defaultPosition: "topRight" }) : item));
          guidePosition.current = "topRight";
        });
        return startFromGuide(nextIdx);
      }
      return {
        top: top + elHeight + DEFAULT_GAP_BETWEEN_GUIDE_TO_EL,
        left: left + elWidth - guideWidth
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const startFromGuide = useCallback((startIdx: number) => {
    if (startIdx >= stemsState.length) throw new Error("Invalid Start Index");
    if (stemsState[startIdx]?.redirectPath) {
      const { state, ...restProps } = stemsState[startIdx]?.redirectPath!;
      router.push(restProps!, {
        query: state
      });
    }
    setTimeout(async () => {
      flushSync(() => {
        setCurrent(startIdx);
      });
      const res = await calculateNextElementPosition(startIdx);
      if (res?.left) {
        setGuideCoord({
          x: res.left,
          y: res.top
        });
        guidePosition.current = null;
      }
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stemsState]);
  const closeOnboardingGuides = useCallback(() => {
    setGuideCoord({ x: -99999, y: -99999 });
    setCurrent(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDocument(window.document)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyUp = (e: any) => {
      if (e.key === "Escape") {
        closeOnboardingGuides();
      }
    }
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <OnboardGuideCtx.Provider value={{ startFromGuide, closeOnboardingGuides }}>
        {children}
      </OnboardGuideCtx.Provider>
      {document && createPortal(
        (
          <OnboardGuide
            next={stemsState[current - 1]}
            coord={guideCoord}
            step={stemsState[current - 1]?.step}
            title={stemsState[current - 1]?.title}
            subTitle={stemsState[current - 1]?.subTitle}
            hasNext={stemsState[current - 1]?.next}
            closeOnboardingGuides={closeOnboardingGuides}
            onNext={() => {
              if (stemsState.length === current) return closeOnboardingGuides();
              setGuideCoord({ x: -99999, y: -99999 });
              startFromGuide(current);
            }}
          />
        ),
        document.querySelector("body")!
      )}
    </>
  )
}

export const useOnboardGuide = () => {
  const res = useContext(OnboardGuideCtx);
  if (!res) throw new Error("OnboardGuideProvider got null values");
  return res;
}

interface OnboardGuideProps {
  next: any;
  coord: {
    x: number;
    y: number;
  }
  step: number;
  hasNext?: boolean;
  title: string;
  subTitle: string;
  onNext: () => void;
  closeOnboardingGuides: () => void;
}

function OnboardGuide({ title, subTitle, onNext, coord, next, step, closeOnboardingGuides, hasNext }: OnboardGuideProps) {
  const elRef = useRef<any>(null);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!elRef.current?.contains(e.target)) {
        closeOnboardingGuides();
      }
    }
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={elRef} className={`${styles.onboardGuide} onboardGuide ${styles[`guidePos__${next?.defaultPosition}`]}`} style={{ top: coord.y, left: coord.x }}>
      <small>STEP {step}</small>
      <h3>{title || "Title"}</h3>
      <p>{subTitle || "Sub Title"}</p>
      <span onClick={onNext}>
        {hasNext && <svg width={27} height={17} viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 8.5C0 9.02156 0.422735 9.44429 0.944292 9.44429H23.6842L17.7274 15.3955C17.5463 15.5767 17.4529 15.8183 17.4529 16.0598C17.4529 16.3014 17.5463 16.543 17.7274 16.7241C18.0953 17.092 18.6937 17.092 19.0615 16.7241L26.6159 9.1643C26.9672 8.81293 26.9672 8.18707 26.6159 7.83021L19.056 0.275876C18.6882 -0.0919587 18.0898 -0.0919587 17.7219 0.275876C17.3541 0.643711 17.3541 1.24213 17.7219 1.60996L23.6732 7.5612H0.938802C0.417245 7.55571 0 7.97844 0 8.5Z" fill="white" />
        </svg>}
      </span>
    </div>
  );
}

function sleep(time:number) {
  return new Promise(res => setTimeout(res, time));
}