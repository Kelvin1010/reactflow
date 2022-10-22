import { selector } from "recoil";
import { contentNewProject } from "./atom";

export const contentDataNewProject = selector({
    key:'contentNode',
    get : ({get}) => {
        const content = get(contentNewProject)
        return content
    }
});