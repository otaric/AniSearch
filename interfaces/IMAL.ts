export default interface IMAL {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english: string;
  aired: {
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
    };
  };
  published: {
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
    };
  };
}
