class ReportsController < ApplicationController
  before_action :set_report, only: [:show, :edit, :update, :destroy]


  # GET /reports
  # GET /reports.json
  def index
    @user = current_user
    @reports = Report.where(:user_id => @user.id)
    @hello_world_props = { name: "Stranger" }
  end

  # GET /reports/1
  # GET /reports/1.json
  def show
    @user = current_user
    @parts = Part.where(:report_id => @report.id)
    @menuProps = { user: @user, report: @report, parts: @parts}
  end

  # GET /reports/new
  def new
    user = current_user.id
    @report = Report.new
    puts "******* new report"
    puts @report.inspect
    date = Time.now.strftime("%d/%m/%Y %H:%M")
    @reportProps = { report: {
                        id: nil,
                        title: "This is default title",
                        header_colour: "blue",
                        footer_colour: "red",
                        footer_date: date,
                        footer_company: "This is default company",
                        user_id: user }
          }


  end

  # GET /reports/1/edit
  def edit
    @user = current_user
  end

  # POST /reports
  # POST /reports.json
  def create
    @user = current_user
    @report = Report.new(report_params)
    @report.user_id = @user.id

    puts "****** report create *****"
    puts @report.inspect

    respond_to do |format|
      if @report.save
        puts "****** report create in if *****"
        puts @report.inspect
        format.html { redirect_to root_path, notice: 'Report was successfully created.' }
        format.json { render :show, status: :created, location: @report }
      else
        format.html { render :new }
        format.json { render json: @report.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /reports/1
  # PATCH/PUT /reports/1.json
  def update
    respond_to do |format|
      if @report.update(report_params)
        format.html { redirect_to root_path, notice: 'Report was successfully updated.' }
        format.json { render :show, status: :ok, location: @report }
      else
        format.html { render :edit }
        format.json { render json: @report.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reports/1
  # DELETE /reports/1.json
  def destroy
    @report.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Report was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_report
      @report = Report.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def report_params
      params.require(:report).permit(:title, :header_colour, :footer_colour, :footer_date, :footer_company, :user_id)
    end
end
