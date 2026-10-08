import { ProjectCardItem } from "@/page-data/projects/projects.interface";

const ProjectCardContent = ({ project }: { project: ProjectCardItem }) => {
  return (
    <>
      <div className="bg-white border-2 border-black inline-block px-3 py-1 font-bold text-xs uppercase mb-4">
        {project.focus}
      </div>
      <h3 className="text-2xl font-black uppercase mb-2 leading-tight">
        {project.title}
      </h3>
      <p className="text-sm font-bold mb-4 border-l-4 border-black pl-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="bg-black text-white flex-none w-auto px-2 py-1 text-xs font-bold text-center"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
};

export default ProjectCardContent;
