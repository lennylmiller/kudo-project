import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { getAvatarURL, imageMaps } from '../../helpers/utils';
import Spinner from '../common/Spinner';
import ThemedContent from './ThemedContent';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root : {
    marginTop : theme.spacing(5)
  },
  options : {
    display : 'flex',
    justifyContent : 'space-between'
  },
  formControl : {},
  radioGroup : {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  optionLabel : {
    fontSize : 20
  },
  cardActions : {
    display : 'flex',
    justifyContent : 'space-between'
  }
}));

const QuestionAnswer = ({
                          question,
                          onAnswer,
                          saving
                        }) => {
  const history = useHistory();
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (saving)
    ? (<Spinner/>)
    : (<Container maxWidth="md">
      <Card className={ classes.root }>
        <ThemedContent
          imageMaps={ imageMaps }
          questionId={ question.id }
          getAvatarURL={ getAvatarURL }>
          <div className={ classes.options }>
            <FormControl className={ classes.formControl } fullWidth={ true } component="fieldset">
              <RadioGroup className={ classes.radioGroup } aria-label="answer" name="answer" value={ selectedOption }
                          onChange={ handleChange }>
                <FormControlLabel
                  classes={ { label : classes.optionLabel } }
                  value="optionOne"
                  label={ question?.optionOne?.text }
                  control={ <Radio/> }
                />
                <Typography classes={ { h6 : classes.orPart } } variant="h6" align="center">OR</Typography>
                <FormControlLabel
                  classes={ { label : classes.optionLabel } }
                  value="optionTwo"
                  label={ question?.optionTwo?.text }
                  control={ <Radio/> }
                />
              </RadioGroup>
            </FormControl>
          </div>

        </ThemedContent>
        <CardActions className={ classes.cardActions }>
          <Button
            size="small"
            color="primary"
            onClick={ () => {
              history.push('/questions');
            } }
          >
            <ArrowBackIcon/>
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={ () => {
              onAnswer({
                preventDefault : () => '',
                target : {
                  name : 'answer',
                  value : selectedOption,
                }
              });
            } }
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Container>);
};

QuestionAnswer.propTypes = {
  question : PropTypes.object.isRequired,
  getStatistics : PropTypes.func.isRequired,
  onChange : PropTypes.func.isRequired,
  onSave : PropTypes.func.isRequired,
  onAnswer : PropTypes.func.isRequired,
  saving : PropTypes.bool
};


function mapStateToProps(state) {
  return {
    handleClose : state.handleClose,
  };
}

export default connect(mapStateToProps, null)(QuestionAnswer);
