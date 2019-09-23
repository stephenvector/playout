import defaultStyled, { CreateStyled } from "@emotion/styled";
import { EmotionTheme } from "../@types";

// Use this instead of styled directly from @emotion/styled
// so that we get type annotation with themes
export const styled = defaultStyled as CreateStyled<EmotionTheme>;
