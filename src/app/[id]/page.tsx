import { performRequest } from "@/lib/datocms";
import { PROJETCTS_CONTENT_QUERY } from "@/lib/queries";
import { ProjectsType } from "@/types/pageData";
import ProjectDetails from "../components/ProjectDetails/ProjectDetails";

// Adicionar revalidação para cache
export const revalidate = 3600; // Revalida a cada hora

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const projectsReponse = (await performRequest(
    PROJETCTS_CONTENT_QUERY,
    {}
  )) as ProjectsType;

  const project = projectsReponse.landingpage.projects.projects.find(
    (project) => project.id === id
  );

  if (!project) {
    return <div>Projeto não encontrado</div>;
  }

  const techs = project.listTechs?.split("\n").filter(Boolean) || [];
  const images = project.projectImages || [];

  return (
    <ProjectDetails
      project={{
        ...project,
        techs,
        images,
      }}
    />
  );
}