import { atom } from "jotai";

interface keyFilterType {
  keyword: string;
  industry: string;
}

export const selectedModal = atom<boolean>(false);
export const verticalSplited = atom<boolean>(false);
export const keyFilter = atom<keyFilterType>({
  keyword: "",
  industry: "",
});
export const wageFilter = atom<number>(0);
export const selectedFilter = atom<string[]>([]);
