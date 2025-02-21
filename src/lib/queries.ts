export const HEADER_CONTENT_QUERY = `
query {
	landingpage {
		header {
			subtitle{
        text
      }
      nome 
      cv{
        url
      }
      profilephoto {
        url
      }
    }
  }
}
  `;

export const ABOUT_CONTENT_QUERY = `
{
  landingpage {
    aboutMe{
      paragraph{
        paragraph
      }
    }
  }
}`

export const SKILLS_CONTENT_QUERY = `
{
  landingpage {
    skills {
      skills {
        logoskill {
          url
        }
        nametech
        studying
      }
    }
  }
}`

export const PROJETCTS_CONTENT_QUERY = `
{
  landingpage {
    projects {
      projects {
        id
        projectImages {
          url
        }
        titleProject
        aboutProject
        respositoryLink
        deployLink
        listTechs
        ispersonal
      }
    }
  }
}`

export const SOCIAL_CONTENT_QUERY = `
{
  landingpage {
    sociallinks {
      logo {
        url
      }
      nome
      link
    }
  }
}`