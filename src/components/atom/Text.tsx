import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  padding-bottom: 30px;
  display: inline-block;
`;

export default function Text(props: TextProps) {
  return <Paragraph role="text">{props.text}</Paragraph>;
}

interface TextProps {
  text: string;
}
