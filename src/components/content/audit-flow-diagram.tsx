export function AuditFlowDiagram() {
  return (
    <figure className="project-diagram" aria-labelledby="audit-flow-caption">
      <ol className="project-diagram__steps">
        <li className="project-diagram__node">
          <span>Client request</span>
        </li>
        <li className="project-diagram__node">
          <span>ASP.NET Core service</span>
        </li>
        <li className="project-diagram__transaction">
          <span className="project-diagram__label">One database transaction</span>
          <div className="project-diagram__branches">
            <div className="project-diagram__node">
              <span>Business data</span>
            </div>
            <div className="project-diagram__node">
              <span>Pending audit event in the outbox</span>
            </div>
          </div>
        </li>
        <li className="project-diagram__node">
          <span>Background outbox publisher</span>
        </li>
        <li className="project-diagram__node">
          <span>NATS JetStream</span>
        </li>
        <li className="project-diagram__node">
          <span>AuditTrailService</span>
        </li>
        <li className="project-diagram__node">
          <span>Chronological audit record</span>
        </li>
      </ol>
      <p className="project-diagram__note">
        Selected critical inter-service validation uses gRPC before the transaction proceeds.
      </p>
      <figcaption id="audit-flow-caption">
        FIG 07 — The business change and pending audit event are stored before asynchronous
        publication.
      </figcaption>
    </figure>
  );
}
