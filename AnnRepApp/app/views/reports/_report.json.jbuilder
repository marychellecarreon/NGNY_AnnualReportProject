json.extract! report, :id, :title, :header_colour, :footer_colour, :footer_date, :footer_company, :created_at, :updated_at, :user_id
json.url user_report_url(current_user, report, format: :json)
