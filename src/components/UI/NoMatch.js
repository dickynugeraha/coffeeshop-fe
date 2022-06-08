import classes from "./NoMatch.module.css";

const NoMatch = () => {
  return (
    <div className={classes.errorpage}>
      <h1>404 Error Page #1</h1>

      <section className={classes["error-container"]}>
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
    </div>
  );
};

export default NoMatch;
