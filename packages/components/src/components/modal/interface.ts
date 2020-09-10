import { ReactNode, CSSProperties } from 'react';
import { ButtonProps } from '../button';

export type IStringOrHtmlElement = string | HTMLElement;

export type TModalSize = 'small' | 'middle' | 'full';

export type TStepNoParamFn = () => void;

export interface ITitleProps {
  title?: ReactNode;
  useBack?: boolean;
  onBack?: TStepNoParamFn;
}

export interface IFooterProps {
  // 可以自定义除了 okButton 以及 closeBtn 外的组件
  additionalFooter?: ReactNode;
  // 完全自定义 Footer 区域
  footer?: ReactNode;
  okButtonProps?: ButtonProps;
  closeButtonProps?: ButtonProps;
  okText?: string;
  closeText?: string;
  onOk?: ((e: React.MouseEvent<HTMLElement>) => void) | ((e: React.MouseEvent<HTMLElement>) => Promise<unknown>);
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  useOk: boolean;
  useClose: boolean;
}

export interface IModalProps extends ITitleProps, Omit<IFooterProps, 'useOk' | 'useClose'> {
  prefixCls?: string;
  className?: string;
  wrapClassName?: string;
  style?: CSSProperties;
  wrapStyle?: Record<string, unknown>;
  bodyStyle?: Record<string, unknown>;
  maskStyle?: Record<string, unknown>;
  bodyProps?: Record<string, unknown>;
  maskProps?: Record<string, unknown>;
  wrapProps?: Record<string, unknown>;
  zIndex?: number;
  closeIcon?: ReactNode;
  children?: ReactNode;
  // 按 ESC 键是否可以关闭 Modal
  keyboard?: boolean;
  // Modal 的尺寸
  size?: TModalSize;
  // Modal 是否可见
  visible?: boolean;
  // 弃用 Footer 中的 close Button
  dropCloseButton?: boolean;
  // 组件 pending 状态
  pending?: boolean;
  // 执行 close 后紧接着执行的操作
  afterClose?: () => void;
  // 点击 Ok 后是否要紧接着执行 close
  closeAfterOk?: boolean;
  // 是否在 Modal 关闭后销毁
  destroyOnClose?: boolean;
  getContainer?: IStringOrHtmlElement | (() => IStringOrHtmlElement) | false;
  forceRender?: boolean;
  focusTriggerAfterClose?: boolean;
}

export type TStepChange = (nextStep: string) => void;

export interface IStepModalNodeRenderProps {
  step: IStep;
  push: TStepChange;
  pop: TStepNoParamFn;
}

export type TStepModalNodeRender = ReactNode | ((renderProps: IStepModalNodeRenderProps) => ReactNode);

export interface IStep {
  // 当前 Step 的唯一标识
  key: string;
  // 当前 Step 的上一步
  return: string | null;
  // 多分支路径下，当前步骤是否是默认的下一步
  firstNextInTier?: boolean;
  // 下一步 回调
  onNext?: TStepNoParamFn;
  // 上一步 回调
  onBack?: TStepNoParamFn;
  // 当前步骤 Modal 的 Title
  title?: TStepModalNodeRender;
  // 当前步骤 Modal 的 Body
  content?: TStepModalNodeRender;
  // 当前步骤 Modal 的 Footer
  footer?: TStepModalNodeRender;
  // 同 Modal.footer
  additionalFooter?: ReactNode;
  // 下一步按钮的 props
  nextButtonProps?: ButtonProps;
  // 上一步按钮的 props
  backButtonProps?: ButtonProps;
  // 下一步按钮的 text
  nextText?: string;
  // 上一步按钮的 text
  backText?: string;
}

export interface IStepInner extends IStep {
  next?: string[];
}

export interface IStepMap {
  [key: string]: IStepInner;
}

export interface IStepModalProps extends IModalProps {
  steps?: IStep[];
  onStepChange?: (step: string) => void;
}
