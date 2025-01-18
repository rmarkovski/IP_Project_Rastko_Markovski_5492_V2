export interface Champion {
    key: string;
    name: string;
    image: {
      full: string;
    };
  }
  
  export interface ChampionData {
    data: Record<string, Champion>;
  }
  