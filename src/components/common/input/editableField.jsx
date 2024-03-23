import Field from "./field";
import PostControls from "../postControls";
import React from "react";
import useForm from "../../../hooks/useForm";
import styled from "styled-components";
import Spinner from "../spinner";

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  max-width: ${(props) => (props["max-width"] ? props["max-width"] : null)};
  align-items: baseline;
`;

const Label = styled.label`
  flex-grow: 1;
`;

const StyledSpinnerContainer = styled.div`
  padding-left: 10px;
`;

const EditableField = ({
  initialValueObj,
  onEditSubmit,
  onEdit = () => {},
  onEditCancel = () => {},
  editLoading,
  schema: mainSchema,
  maxWidth,
  type = "text",
  label,
  textComponent: TextComponent,
}) => {
  const [isEditting, setIsEditting] = React.useState(false);
  const fieldName = Object.keys(initialValueObj)[0];
  const schema = { [fieldName]: mainSchema[fieldName] };

  const editSubmit = async (values) => {
    const error = await onEditSubmit(fieldName, values[fieldName]);
    if (!error) {
      setIsEditting(false);
      return;
    }
    setErrors({ [fieldName]: error });
  };

  const {
    setErrors,
    errors,
    handleSubmit,
    submitDisabled,
    handleChange,
    values,
    resetInput,
  } = useForm({
    initialValues: initialValueObj,
    onSubmit: editSubmit,
    schema,
  });

  const submitAllowed =
    !submitDisabled && !(initialValueObj[fieldName] === values[fieldName]);

  return (
    <ContainerDiv max-width={maxWidth}>
      {isEditting ? (
        <Field
          value={values[fieldName]}
          error={errors[fieldName]}
          onChange={handleChange}
          label={"New " + fieldName}
          id={fieldName}
          type={type}
          withTitle={false}
          grow={true}
          noMargin={true}
          tooltipError={true}
          autoFocus={true}
          doSubmit={() => submitAllowed && editSubmit(values)}
        />
      ) : TextComponent ? (
        <TextComponent>{label || values[fieldName]}</TextComponent>
      ) : (
        <Label>{label || values[fieldName]}</Label>
      )}
      <div>
        {!editLoading ? (
          <PostControls
            noDelete={true}
            onEdit={() => {
              setIsEditting(true);
              onEdit(fieldName);
            }}
            onEditCancel={() => {
              setIsEditting(false);
              resetInput();
              onEditCancel(fieldName);
            }}
            onEditConfirm={handleSubmit}
            editConfirmDisabled={!submitAllowed}
            isEditting={isEditting}
          />
        ) : (
          <StyledSpinnerContainer>
            <Spinner position="relative" />
          </StyledSpinnerContainer>
        )}
      </div>
    </ContainerDiv>
  );
};

export default EditableField;
