import type { FunctionalComponent } from 'preact';
import { h } from 'preact';
import { TABS } from '../const';
import useWindowSize from '../hooks/useWindowSize';

export interface Props {
  currentTab: keyof typeof TABS;
  setCurrentTab: (val: keyof typeof TABS) => void;
}

const Menu: FunctionalComponent<Props> = ({ currentTab, setCurrentTab, children }) => {
  const { isDesktop } = useWindowSize();

  // if window is expanding from mobile -> desktop, make sure code AND preview are shown side-by-side (no need for desktop -> mobile)
  if (isDesktop && currentTab === TABS.CODE) {
    setCurrentTab(TABS.PREVIEW);
  }

  return (
    <menu class="ap-tabgroup ap-app-tabs" role="tabgroup">
      <div class="ap-tabgroup-tabwrapper">
        <button
          aria-controls="panel-code"
          aria-selected={currentTab === TABS.CODE}
          class="ap-tabgroup-tab ap-tabgroup-tab__mobile"
          id="tab-code"
          onClick={() => setCurrentTab(TABS.CODE)}
          role="tab"
          type="button"
        >
          Code
        </button>
      </div>
      <div class="ap-tabgroup-tabwrapper">
        <button
          aria-controls="panel-frame"
          aria-selected={currentTab === TABS.PREVIEW}
          class="ap-tabgroup-tab"
          id="tab-preview"
          onClick={() => setCurrentTab(TABS.PREVIEW)}
          role="tab"
          type="button"
        >
          Preview
        </button>
      </div>
      <div class="ap-tabgroup-tabwrapper">
        <button
          aria-controls="panel-html"
          aria-selected={currentTab === TABS.HTML}
          class="ap-tabgroup-tab"
          id="tab-preview"
          onClick={() => setCurrentTab(TABS.HTML)}
          role="tab"
          type="button"
        >
          HTML
        </button>
      </div>
      <div class="ap-tabgroup-tabwrapper">
        <button
          aria-controls="panel-js"
          aria-selected={currentTab === TABS.JS}
          class="ap-tabgroup-tab"
          id="tab-js"
          onClick={() => setCurrentTab(TABS.JS)}
          role="tab"
          type="button"
        >
          JS
        </button>
      </div>
      {/* <div class="ap-preview-menugroup">
    <button id="layout" role="switch" aria-checked="false" aria-label="Toggle layout" class="ap-switch">
      <svg class="ap-icon ap-icon__layoutvertical" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
        <path
          clip-rule="evenodd"
          d="m8 1h5c.5523 0 1 .44772 1 1v11c0 .5523-.4477 1-1 1h-5zm-1 0h-5c-.55228 0-1 .44772-1 1v11c0 .5523.44772 1 1 1h5zm-7 1c0-1.10457.895431-2 2-2h11c1.1046 0 2 .895431 2 2v11c0 1.1046-.8954 2-2 2h-11c-1.10457 0-2-.8954-2-2z"
          fill-rule="evenodd"
        />
      </svg>
      <svg class="ap-icon ap-icon__layouthorizontal" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
        <path
          clip-rule="evenodd"
          d="m13 0h-11c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2zm-11 1h11c.6 0 1 .4 1 1v5h-13v-5c0-.6.4-1 1-1zm11 13h-11c-.6 0-1-.4-1-1v-5h13v5c0 .6-.4 1-1 1z"
          fill-rule="evenodd"
        />
      </svg>
    </button>
  </div> */}
      {/* <div class="ap-preview-menugroup">
    <button id="theme" role="switch" aria-checked="true" aria-label="Toggle theme" class="ap-switch">
      <svg class="ap-icon ap-icon__themelight" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="m8 0c.26522 0 .51957.105357.70711.292893.18753.187537.29289.441891.29289.707107v1c0 .26522-.10536.51957-.29289.70711-.18754.18753-.44189.29289-.70711.29289s-.51957-.10536-.70711-.29289c-.18753-.18754-.29289-.44189-.29289-.70711v-1c0-.265216.10536-.51957.29289-.707107.18754-.187536.44189-.292893.70711-.292893zm4 8c0 1.06087-.4214 2.0783-1.1716 2.8284-.7501.7502-1.76753 1.1716-2.8284 1.1716s-2.07828-.4214-2.82843-1.1716c-.75014-.7501-1.17157-1.76753-1.17157-2.8284s.42143-2.07828 1.17157-2.82843c.75015-.75014 1.76756-1.17157 2.82843-1.17157s2.0783.42143 2.8284 1.17157c.7502.75015 1.1716 1.76756 1.1716 2.82843zm-.464 4.95.707.707c.1886.1822.4412.283.7034.2807s.513-.1075.6984-.2929.2906-.4362.2929-.6984-.0985-.5148-.2807-.7034l-.707-.707c-.1886-.1822-.4412-.283-.7034-.2807s-.513.1075-.6984.2929-.2906.4362-.2929.6984.0985.5148.2807.7034zm2.12-10.607c.1875.18753.2928.44184.2928.707s-.1053.51947-.2928.707l-.706.707c-.0922.09551-.2026.17169-.3246.2241s-.2532.08-.386.08115-.2645-.02415-.3874-.07443-.2345-.12453-.3284-.21842c-.0939-.0939-.1681-.20555-.2184-.32845-.0503-.12289-.0756-.25457-.0745-.38735.0012-.13278.0288-.264.0812-.386.0524-.12201.1286-.23235.2241-.3246l.707-.707c.1875-.18747.4418-.29279.707-.29279s.5195.10532.707.29279zm1.344 6.657c.2652 0 .5196-.10536.7071-.29289.1875-.18754.2929-.44189.2929-.70711s-.1054-.51957-.2929-.70711c-.1875-.18753-.4419-.29289-.7071-.29289h-1c-.2652 0-.5196.10536-.7071.29289-.1875.18754-.2929.44189-.2929.70711s.1054.51957.2929.70711c.1875.18753.4419.29289.7071.29289zm-7 4c.26522 0 .51957.1054.70711.2929.18753.1875.29289.4419.29289.7071v1c0 .2652-.10536.5196-.29289.7071-.18754.1875-.44189.2929-.70711.2929s-.51957-.1054-.70711-.2929c-.18753-.1875-.29289-.4419-.29289-.7071v-1c0-.2652.10536-.5196.29289-.7071.18754-.1875.44189-.2929.70711-.2929zm-4.95-8.536c.09284.09291.20308.16662.32441.21693s.25139.07623.38274.07627c.13134.00005.26142-.02578.38278-.076.12137-.05022.23166-.12386.32457-.2167s.16662-.20308.21693-.32441.07623-.25139.07627-.38274c.00005-.13134-.02578-.26142-.076-.38278-.05022-.12137-.12386-.23166-.2167-.32457l-.708-.707c-.1886-.18216-.4412-.28295-.7034-.28067-.2622.00227-.51301.10744-.69842.29285s-.29058.43622-.29285.69842c-.00228.2622.09851.5148.28067.7034zm1.414 8.486-.707.707c-.1886.1822-.4412.283-.7034.2807s-.51301-.1075-.69842-.2929-.29058-.4362-.29285-.6984c-.00228-.2622.09851-.5148.28067-.7034l.707-.707c.1886-.1822.4412-.283.7034-.2807s.51301.1075.69842.2929.29058.4362.29285.6984c.00228.2622-.09851.5148-.28067.7034zm-2.464-3.95c.26522 0 .51957-.10536.70711-.29289.18753-.18754.29289-.44189.29289-.70711s-.10536-.51957-.29289-.70711c-.18754-.18753-.44189-.29289-.70711-.29289h-1c-.265216 0-.51957.10536-.707107.29289-.187536.18754-.292893.44189-.292893.70711s.105357.51957.292893.70711c.187537.18753.441891.29289.707107.29289z" />
      </svg>
      <svg class="ap-icon ap-icon__themedark" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="m15.293 11.293c-1.4815.6701-3.132.8729-4.7316.5813-1.59965-.2916-3.07245-1.0637-4.22221-2.21348-1.14975-1.14975-1.92185-2.62255-2.21345-4.22219-.29159-1.59963-.08883-3.25014.58127-4.731629-1.17943.533009-2.21196 1.344199-3.00899 2.363959-.797033 1.01976-1.334776 2.21766-1.567096 3.49093-.232319 1.27326-.1522805 2.58388.23325 3.81941.385531 1.2355 1.065046 2.3591 1.980246 3.2743.91519.9152 2.03876 1.5947 3.27429 1.9802 1.23553.3856 2.54615.4656 3.81942.2333s2.47117-.7701 3.49097-1.5671c1.0197-.797 1.8309-1.8296 2.3639-3.009z" />
      </svg>
    </button>
  </div> */}
    {children}
    </menu>
  );
};

export default Menu;
