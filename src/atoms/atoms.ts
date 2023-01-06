import { atom } from "jotai";

interface keyFilterType {
  keyword: string;
  industry: string;
}
interface primarySelectedFilterType {
  isCertified: boolean;
  inclusive: boolean;
}

export const selectedModal = atom<boolean>(false);
export const verticalSplited = atom<boolean>(false);
export const keyFilter = atom<keyFilterType>({
  keyword: "",
  industry: "",
});
export const wageFilter = atom<number>(0);
export const primarySelectedFilter = atom<primarySelectedFilterType>({
  isCertified: false,
  inclusive: false,
});
export const selectedFilter = atom<string[]>([]);

// 전체 알림창
export const activeAlert = atom<string>("");

// 메인 페이지네이션
export const mainPagination = atom<number>(0);
