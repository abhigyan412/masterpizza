import React from "react";
import { useForm } from "react-hook-form";

const SearchForm = ({
  setViewSearch,
  searchParams,
  searchFieldSet,
  clientSearch,
}) => {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (values) => {
    searchParams(values);
  };
 
  const loadFields = (fields) => {
    return fields.map((control, index) => {
      let { type, name, displayText, otherProps, validationProps } = control;
      return (
        <div className="form-group col-md-6" key={index}>
          <label htmlFor={name} className="form-label mt-4">
            {displayText}
          </label>
          <input
            type={type}
            className="form-control"
            autoComplete="off"
            id={name}
            {...otherProps}
            {...register(name, validationProps)}
          />
          {errors[name] && (
            <span className="text-danger">{errors[name]["message"]}</span>
          )}
        </div>
      );
    });
  };
  const loadFields1 = (fields) => {
    return fields.map((control, index) => {
      let { type, name, displayText, otherProps, validationProps } = control;
      return (
        <div className="form-group col-md-6" key={index}>
          <label htmlFor={name} className="form-label mt-1">
            {displayText}
          </label>
          <input
            type={type}
            className="form-control"
            autoComplete="off"
            id={name}
            {...otherProps}
            {...register(name, validationProps)}
            onChange={(e) => {
              searchParams(e.target.value);
            }}
          />
          {errors[name] && (
            <span className="text-danger">{errors[name]["message"]}</span>
          )}
        </div>
      );
    });
  };
  return (
    <div className="search-layout mb-3">
      {!clientSearch
        ? [
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <div className="row">{loadFields(searchFieldSet.fields)}</div>
                <div className="mt-3 d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-primary">
                    Search
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => setViewSearch(false)}
                  >
                    Cancel
                  </button>
                </div>
              </fieldset>
            </form>,
          ]
        : [
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <div className="row">
                  <div className="col-md-10">
                    {loadFields1(searchFieldSet.fields)}
                  </div>
                  <div className="col-md-1 mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        setViewSearch(false);
                        searchParams("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>,
          ]}
    </div>
  );
};

export default SearchForm;
