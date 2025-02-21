export type HeaderType = {
  landingpage: {
    header: {
      subtitle: Array<{ text: string }>;
      nome: string;
      cv: {
        url: string;
      };
      profilephoto: {
        url: string;
      };
    };
  };
};

export type AboutType = {
  landingpage: {
    aboutMe: {
      paragraph: {
        paragraph: string;
      }[];
    };
  };
};

export type SkillsType = {
  landingpage: {
    skills: {
      skills: Array<{
        logoskill: {
          url: string;
        };
        nametech: string;
        studying: boolean;
      }>;
    };
  };
};

export type ProjectsType = {
  landingpage: {
    projects: {
      projects: Array<{
        id: string,
        projectImages: Array<{
          url: string;
        }>;
        titleProject: string;
        aboutProject: string;
        respositoryLink: string;
        deployLink: string;
        listTechs: string;
        ispersonal: boolean;
      }>;
    };
  };
};

export type SocialLinksType = {
  landingpage: {
    sociallinks: Array<{
      logo: {
        url: string;
      };
      nome: string;
      link: string;
    }>;
  };
};