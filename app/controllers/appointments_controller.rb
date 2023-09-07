class AppointmentsController < ApplicationController
  before_action :authorize_user
  before_action :load_patient, only: [:index, :create]
  before_action :load_appointment, only: [:show, :update, :destroy]
  before_action :check_owner, only: [:update, :destroy]

  def index # get "/patients/:patient_id/appointments"
    if params[:patient_id] # is there a route parameter? aka, do I come from a nested route?
      load_patient
      if @patient
        render json: @patient.appointments
      else
        render json: { error: "Cannot find patient with id: #{params[:patient_id]}" }, status: :not_found
      end
    end 
  end

  def create
    appointment = @patient.appointments.build(appointment_params)
    appointment.user = current_user

    if appointment.save
      render json: appointment, status: :created
    else
      render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: @appointment
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
    params.require(:appointment).permit(:name, :category, :location, :date, :description, :patient_id)
  end

  def load_patient
    @patient = Patient.find_by_id(params[:patient_id])
  end

  def load_appointment
    @appointment = Appointment.find_by_id(params[:id])
    render json: { error: "Appointment not found" }, status: :not_found unless @appointment
  end


  def check_owner
    unless @appointment.user == current_user
      render json: { errors: { User: "does not own this appointment." } }, status: :forbidden
    end 
  end
end 