import React from 'react';
import { Field } from 'formik';
import {
  FormControlLabel,
  Radio,
  Typography,
  FormControl,
  MenuItem,
  Grid,
  TextField
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { CheckboxWithLabel, RadioGroup } from 'formik-material-ui';
import { includes } from 'lodash';

const RenderQuestionByInputTypes = ({
  question,
  onInputChange,
  visibility
}) => {
  const [values, setValues] = React.useState({});

  const handleChange = (event, type, questionCode, optionValue) => {
    switch (type) {
      case 'checkbox':
        {
          if (!values[questionCode]) {
            values[questionCode] = [optionValue];
          } else {
            if (includes(values[questionCode], optionValue)) {
              let optionValueIndex = values[questionCode].indexOf(optionValue);
              if (optionValueIndex !== -1) {
                values[questionCode].splice(optionValueIndex, 1);
              }
            } else {
              values[questionCode].push(optionValue);
            }
          }
        }
        break;
      case 'radio':
        {
          values[questionCode] = event.target.value;
        }
        break;
      case 'text':
        {
          values[questionCode] = event.target.value;
        }
        break;
      case 'textarea':
        {
          values[questionCode] = event.target.value;
        }
        break;
      case 'rating':
        {
          values[questionCode] = event.target.value;
        }
        break;
    }
    const newValues = { ...values };
    setValues(newValues);
    onInputChange(newValues);
  };

  const renderQuestion = () => {
    if (question) {
      switch (question.questionType) {
        case 'rating':
          return (
            <span key={'rating' + question.questionName}>
              <Typography component="legend">{question.question}</Typography>
              <Rating
                name={question.questionName}
                id="rating"
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                onChange={event =>
                  handleChange(
                    event,
                    question.questionType,
                    question.questionCode
                  )
                }
              />
            </span>
          );
        case 'text':
          return (
            <div key={'text' + question.questionCode}>
              <TextField
                color="primary"
                name={question.questionCode}
                id={question.questionCode}
                label={question.question}
                variant="outlined"
                onBlur={event =>
                  handleChange(
                    event,
                    question.questionType,
                    question.questionCode
                  )
                }
              />
              <br />
            </div>
          );
        case 'textarea':
          return (
            <div key={'textarea' + question.questionCode}>
              <TextField
                color="primary"
                name={question.questionCode}
                id={question.questionCode}
                label={question.question}
                variant="outlined"
                multiline
                rows={
                  (question.additionalConfig &&
                    question.additionalConfig.rows) ||
                  3
                }
                onBlur={event =>
                  handleChange(
                    event,
                    question.questionType,
                    question.questionCode
                  )
                }
                style={{ width: '100%' }}
              />
              <br />
              <br />
            </div>
          );
        case 'checkbox':
          return (
            <div key={'checkbox' + question.questionCode}>
              <Typography color={visibility ? 'textSecondary' : 'textPrimary'}>
                {question.question}
              </Typography>
              {
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  {question.option.map((option, index) => {
                    return (
                      <Grid item key={`checkbox-${index}`}>
                        <Field
                          component={CheckboxWithLabel}
                          type="checkbox"
                          name={option.name}
                          Label={{ label: option.label }}
                          disabled={visibility}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              }
            </div>
          );
        case 'radio':
          return (
            <div key={'radio' + question.questionCode}>
              <Typography>{question.question}</Typography>
              <Field component={RadioGroup} name={question.questionCode}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  {question.option.map((option, index) => {
                    return (
                      <Grid
                        item
                        key={`radio-option-${question.questionCode}-${index}`}
                      >
                        <FormControlLabel
                          value={option.label}
                          control={<Radio disabled={visibility} />}
                          label={option.label}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Field>
            </div>
          );
        case 'select':
          return (
            <div key={'select' + question.name}>
              <Typography>{question.question}</Typography>
              <FormControl key={'select' + question.name}>
                <Field
                  component={TextField}
                  type="text"
                  name={question.questionName}
                  id={question.questionName}
                  select={true}
                  placeholder="Select"
                  variant="outlined"
                  size="medium"
                >
                  {question.option.map((option, index) => (
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                  ))}
                </Field>
              </FormControl>
              <br />
              <br />
            </div>
          );
        default:
          return null;
      }
    }
  };

  return renderQuestion();
};

export default RenderQuestionByInputTypes;