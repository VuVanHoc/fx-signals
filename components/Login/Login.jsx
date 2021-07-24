import { useState, useCallback } from "react";
import Logo from "../Logo";
import styles from "./Login.module.css";
import cx from "classnames";
import ReactLoading from "react-loading";
import api from "../../api";
import { useRouter } from "next/router";

export default function Login() {
  const [error, setError] = useState(null);
  const [accessKey, setAccessKey] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const routers = useRouter();

  const onChangeAccessKey = useCallback(
    (e) => {
      setAccessKey(e.target.value);
      setError(null);
    },
    [setAccessKey, setError]
  );
  const onSubmitKey = useCallback(async () => {
    if (!accessKey?.trim()) {
      setError("Please enter access key");
      return;
    }
    if (submitting) return;

    setError(null);
    setSubmitting(true);

    try {
      const res = await api.post(
        "/validate",
        {},
        {
          params: {
            accessKey: accessKey,
          },
        }
      );
      if (res?.data) {
        sessionStorage.setItem("accessKey", accessKey);
        setSubmitting(false);
        routers.push("/");
      } else {
        setSubmitting(false);
        setError("Your access key is invalid. Please try again");
      }
    } catch (error) {}
  }, [setError, accessKey, submitting, setSubmitting, routers]);

  const onKeyPressInput = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onSubmitKey();
      }
    },
    [onSubmitKey]
  );
  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.wrapper}>
        <label className={styles.label}>Access key</label>
        <input
          value={accessKey}
          onChange={onChangeAccessKey}
          onKeyDown={onKeyPressInput}
          id="access-key"
          placeholder="Enter access key"
          className={cx(styles.input, { [styles.error]: !!error })}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button
          className={cx(styles.button, { [styles.loadingButton]: submitting })}
          onClick={onSubmitKey}
        >
          {submitting ? (
            <ReactLoading
              className={styles.loadingIcon}
              height={18}
              width={30}
              type="bars"
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}
