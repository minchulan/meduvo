class AppointmentsController < ApplicationController
  before_action :authorize_user

  def index
    appointments = Appointment.all
    render json: appointments
  end

  def create
    appointment = current_user.appointments.create(appointment_params)
    render json: appointment, status: :accepted 
  end

  def show
    appointment = current_user.appointments.find_by_id(params[:id])
    if appointment
      render json: appointment
    else  
      render json: { error: "Appointment not found" }, status: :not_found 
    end 
  end

  def update
    appointment = find_user_appointment_by_id
    if appointment.update(appointment_params)
      render json: appointment 
    else  
      render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity 
    end 
  end

  def destroy
    appointment = find_user_appointment_by_id
    appointment.destroy 
    head :no_content
  end

  private

  def appointment_params
    params.require(:appointment).permit(:name, :category, :location, :date, :description, :patient_id)
  end

  def find_user_appointment_by_id 
    appointment = current_user.appointments.find_by_id(params[:id])
    unless appointment 
      render json: { error: "Appointment not found" }, status: :not_found 
    end 
    appointment 
  end 
end

## appointment = current_user.appointments.find_by_id(params[:id])
# update and destroy actions are performing similar operations to find the appointment associated with the current user by its ID. Consolidated comon logic into a private method `find_user_appointment_by_id`
