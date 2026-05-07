export type MistakeStar = {
  id: string;
  text: string;
  created_at: string;
  visible_until: string;
};

export type ReleasePayload = {
  id?: string;
  text: string;
  created_at?: string;
  visible_until?: string;
};
