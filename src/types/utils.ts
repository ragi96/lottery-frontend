export interface JustChildProps {
  children: React.ReactNode;
}
export interface ButtonStyleProps {
  primary: boolean;
}

export interface SlideContent {
  key: number;
  title: string;
  text1: string;
  text2: string;
  label: string;
  link: string;
  buttonType: string;
  reverse: boolean;
}

export interface StatusMessages {
  text: string;
  txHash: string;
  type: 'success' | 'error' | 'warning' | 'none';
}
