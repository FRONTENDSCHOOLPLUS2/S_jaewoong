import { create } from "zustand";
import { persist } from "zustand/middleware"

interface UserStore {
  id: string;
  setId: (id: string) => void;
  email: string;
  setEmail: (email: string) => void;
  name: string;
  setName: (name: string) => void;
  type: string;
  setType: (type: string) => void;
  image: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: boolean;
  key: string;
  setLogin: (login: boolean) => void;
  setAccessToken: (accessToken: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setImage: (image: string | null) => void;
  setField: (field: keyof UserStore, value: unknown) => void;
}
export const userStore = create(
  persist<UserStore>(
    (set) => ({
      id: "",
      setId: (id) => set({ id }),
      email: "",
      setEmail: (email) => set({ email }),
      name: "",
      setName: (name) => set({ name }),
      type: "user",
      setType: (type) => set({ type }),
      image: null,
      accessToken: null,
      refreshToken: null,
      login: false,
      key: "https://api.fesp.shop",
      setLogin: (login) => set({ login }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setImage: (image) => set({ image }),
      setField: (field, value) =>
        set((state) => ({ ...state, [field]: value })),
    }),
    {
      name: "user-storage",
      getStorage: () => sessionStorage,
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        name: state.name,
        image: state.image,
        login: state.login,
        id: state.id,
      }),
    }
  )
);

interface PostStore {
  title: string,
  setTitle: (title: string) => void,
  content: string,
  setContent: (content: string) => void,

}
export const postStore = create<PostStore>((set)=>({
  title:"",
  setTitle: (title) => set({ title }),
  content:"",
  setContent: (content) => set({content}),
  setField: (field, value) =>
        set((state) => ({ ...state, [field]: value })),
}))

export const commentStore = create((set) => ({
  comment: "",
  setComment: (comment) => set({ comment }),
  commentPostId: "",
  reply_id: "",
  commentFix: "",
  setCommentFix: (commentFix) => set ({commentFix}),
  setReply_id : (reply_id) => set({ reply_id }),
  setCommentPostId: (commentPostId) => set({ commentPostId }),
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));
export default userStore;
