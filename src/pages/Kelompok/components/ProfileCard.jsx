function ProfileCard({ name, imgSrc, projects = [] }) {
  return (
    <div className="card p-3">
      <img className="card-img-top" src={imgSrc} alt={name} />
      <div className="card-body my-3">
        <h4 className="card-title text-center mb-2">{name}</h4>
        <div className="wrapdropdown">
          <div className="btn-group">
            <button type="button" className="btn button btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Website Project Saya
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <li key={index}>
                    <a className="dropdown-item" href={'/redirect?to='+project.link}>
                      {project.name}
                    </a>
                  </li>
                ))
              ) : (
                <li><span className="dropdown-item">No projects available</span></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
