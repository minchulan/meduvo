class AppointmentsController < ApplicationController
  before_action :authorize_user
  before_action :load_patient, only: [:index, :create]
  before_action :load_appointment, only: [:show, :update, :destroy]
  before_action :is_owner?, only: [:update, :destroy]

  def index
    if @patient
      render json: @patient.appointments
    else
      render json: Appointment.all
    end
  end

  def create
    appointment = @current_user.appointments.build(appointment_params)
    @patient.appointments << appointment

    if appointment.valid?
      render json: appointment, status: :created
    else
      render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    if @appointment
      render json: @appointment
    else
      render json: { error: "Appointment not found" }, status: :not_found
    end
  end

  def update
    if @appointment.update(appointment_params)
      render json: @appointment
    else
      render json: { errors: @appointment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @appointment.destroy
    head :no_content
  end

  private

  def appointment_params
    params.require(:appointment).permit(:id, :name, :category, :location, :date, :description, :patient_id, :user_id)
  end

  def load_patient
    @patient = Patient.find_by_id(params[:patient_id])
  end

  def load_appointment
    @appointment = current_user.appointments.find_by_id(params[:id])
    unless @appointment
      render json: { error: "Appointment not found" }, status: :not_found
    end
  end

  def is_owner? 
    permitted = @appointment.user_id == current_user.id 
    render json: {errors: {User: "does not own this appointment."}}, status: :forbidden unless permitted 
  end 
end


# nutshell: to handle a nested route, we need a conditional. Plus, must introspect on the params. If we have route param, we're coming from a nested route. If not, we're coming from a non-nested route. 

# def create => i can create an appointment if i were to have that route "/appointments", but we don't have that route. or i can create an appointment from a nested route.. "/patients/:patient_id/appointments". I differentiate this with a conditional. if you see in the URL a :patient_id parameter, if so, i am trying to access it from a nested route POV. If not, we're probably just coming from post "/appointments". if you see rails routes, i don't have post "/appointments" bc it was built nested.  

#it makes sense to create an appointment in the context of an existing patient in the page of the patient....however, i built it so that user can create an appointment in the context of an existing patient but it navigates to a new page "/patients/patientId/appointments/new"

# if we have a params patient id, then find the patient. Find will raise an exception, and we rescue it if it's even raised. Instead of saying Appointment.create, we say on the patient we found, get a list of appointments, create a new appointment. This will create an appointment and build the association between the two. hey patient you have a new appointment in town, also hey appointment your patient is the following. builds both of the communication line. 

# I'm building an appointment within the context of a patient, which is effectively associating the appointment with that patient, and then saving the appointment.

# The load_patient and load_appointment methods have been added as before_action callbacks to ensure consistent loading of patients and appointments based on the URL parameters.

# The index action checks if the @patient is available and renders appointments associated with that patient if it exists. If not, it renders all appointments.

# The show action now checks if the @appointment is available and renders the appointment details if found, or an error if not found.

#before it tries to run the update method, it's going to check to see if it's the owner...meaning, is it the currently logged in user's appointment(s). If it's not, then render some errors out. 