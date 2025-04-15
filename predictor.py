import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import math
import sys
import json


df = pd.read_csv("fake_data.csv")


df_model = df[['Day', 'Hour', 'Faculty_Present']].copy()
df_model['Day'] = df_model['Day'].astype('category').cat.codes

X = df_model[['Day', 'Hour']]
y = df_model['Faculty_Present']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)


planned_classes = {
    'Math': 48, 'OS': 48, 'CI': 24, 'DB': 48,
    'E': 24, 'COD': 48, 'L1': 36, 'L2': 36, 'Minor': 36
}

attendance_df = df[df['Class_Held'] == 1].groupby('Subject').agg(
    classes_attended=('Faculty_Present', 'sum')
)

attendance_df['total_planned'] = attendance_df.index.map(planned_classes)
attendance_df['current_attendance'] = 100 * attendance_df['classes_attended'] / attendance_df['total_planned']
attendance_df['required_classes'] = (76 / 100) * attendance_df['total_planned']
attendance_df['extra_classes_to_attend'] = (
    attendance_df['required_classes'] - attendance_df['classes_attended']
).apply(lambda x: max(0, math.ceil(x)))

if __name__ == "__main__":
    input_day_str = sys.argv[1]  
    input_hour = int(sys.argv[2])  

    
    match = df[(df['Day'] == input_day_str) & (df['Hour'] == input_hour)]
    if match.empty:
        print(json.dumps({
            "error": "No data available for the given day and hour"
        }))
        sys.exit()

    input_subject = match['Subject'].values[0]

    
    input_subject_upper = input_subject.upper()
    upper_index = attendance_df.index.to_series().str.upper()

    if input_subject_upper in upper_index.values:
        subject_stats = attendance_df[upper_index == input_subject_upper].iloc[0]
        current_attendance = f"{subject_stats['current_attendance']:.2f}%"
        extra_classes = int(subject_stats['extra_classes_to_attend'])
    else:
        print(json.dumps({
            "error": "Subject not found in attendance records"
        }))
        sys.exit()

    
    day_code = pd.Series([input_day_str]).astype('category').cat.codes[0]
    input_data = pd.DataFrame({'Day': [day_code], 'Hour': [input_hour]})
    prediction = model.predict(input_data)[0]
    faculty_status = "Yep,They're Here" if prediction == 1 else "Nope,Not Today"

    
    result = {
        "subject": input_subject,
        "current_attendance": current_attendance,
        "extra_classes_needed": extra_classes,
        "faculty_prediction": faculty_status
    }

    print(json.dumps(result))
