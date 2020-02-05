export interface IChat {
    from: {
      name: string;
      uid: string;
    };
    content: string;
    gomdon_ctime: number;
    gomdon_id?: string;
  }
  