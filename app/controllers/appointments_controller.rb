class AppointmentsController < ApplicationController
  before_action :authenticate_user

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
    appointment = current_user.appointments.find_by_id(params[:id])
    appointment.update(appointment_params)
    render json: appointment
  end

  def destroy
    appointment = current_user.appointments.find_by_id(params[:id])
    appointment.destroy 
    head :no_content
  end

  private

  def appointment_params
    params.require(:appointment).permit(:name, :category, :location, :date, :description, :patient_id)
  end
end
