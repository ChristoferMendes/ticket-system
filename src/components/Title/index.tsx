import { ReactNode } from "react";
import { Container } from "./styles";

interface TitleProps {
  children: ReactNode;
  name: string;
}

export default function Title({ children, name }: TitleProps) {
  return(
    <Container>
      {children}
      <span>{name}</span>
    </Container>
  )
}