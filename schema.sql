CREATE TABLE
    verification_token (
        identifier TEXT NOT NULL,
        expires TIMESTAMPTZ NOT NULL,
        token TEXT NOT NULL,
        PRIMARY KEY (identifier, token)
    );

CREATE TABLE
    accounts (
        id SERIAL,
        "userId" INTEGER NOT NULL,
        type VARCHAR(255) NOT NULL,
        provider VARCHAR(255) NOT NULL,
        "providerAccountId" VARCHAR(255) NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at BIGINT,
        id_token TEXT,
        scope TEXT,
        session_state TEXT,
        token_type TEXT,
        PRIMARY KEY (id)
    );

CREATE TABLE
    sessions (
        id SERIAL,
        "userId" INTEGER NOT NULL,
        expires TIMESTAMPTZ NOT NULL,
        "sessionToken" VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    users (
        id SERIAL,
        name VARCHAR(255),
        email VARCHAR(255),
        "emailVerified" TIMESTAMPTZ,
        image TEXT,
        PRIMARY KEY (id)
    );

CREATE TABLE
    units (id VARCHAR(255), PRIMARY KEY (id));

INSERT INTO
    units (id)
VALUES
    ('g/L'),
    ('mg/dL'),
    ('ug/dL'),
    ('ng/mL'),
    ('pg/mL'),
    ('mmol/L'),
    ('umol/L'),
    ('mEq/L'),
    ('IU/L'),
    ('U/L'),
    ('mL/min'),
    ('mL/min/1.73m²'),
    ('10^9/L'),
    ('10^12/L'),
    ('U/gHb'),
    ('mmHg'),
    ('pmol/L'),
    ('nmol/L'),
    ('pH'),
    ('ng/dL'),
    ('ug/L'),
    ('mOsm/kg'),
    ('kg/m²'),
    ('cm'),
    ('seconds'),
    ('%'),
    ('ratio'),
    ('mg/24hr') ON CONFLICT (id) DO NOTHING;

CREATE TABLE
    markers (
        id VARCHAR(255),
        default_title VARCHAR(255) NOT NULL,
        default_unit_id VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

INSERT INTO
    markers (id, default_title, default_unit_id)
VALUES
    ('HGB', 'Hemoglobin', 'g/dL'),
    ('WBC', 'White Blood Cell Count', '10^9/L'),
    ('PLT', 'Platelet Count', '10^9/L'),
    ('HCT', 'Hematocrit', '%'),
    ('MCV', 'Mean Corpuscular Volume', 'fL'),
    ('MCH', 'Mean Corpuscular Hemoglobin', 'pg'),
    (
        'MCHC',
        'Mean Corpuscular Hemoglobin Concentration',
        'g/dL'
    ),
    ('RDW', 'Red Cell Distribution Width', '%'),
    ('LYM', 'Lymphocytes', '10^9/L'),
    ('MON', 'Monocytes', '10^9/L'),
    ('NEU', 'Neutrophils', '10^9/L'),
    ('EOS', 'Eosinophils', '10^9/L'),
    ('BAS', 'Basophils', '10^9/L'),
    ('ALT', 'Alanine Aminotransferase', 'U/L'),
    ('AST', 'Aspartate Aminotransferase', 'U/L'),
    ('ALP', 'Alkaline Phosphatase', 'U/L'),
    ('GGT', 'Gamma-Glutamyl Transferase', 'U/L'),
    ('TBIL', 'Total Bilirubin', 'mg/dL'),
    ('DBIL', 'Direct Bilirubin', 'mg/dL'),
    ('CRP', 'C-Reactive Protein', 'mg/L'),
    ('BUN', 'Blood Urea Nitrogen', 'mg/dL'),
    ('CRE', 'Creatinine', 'mg/dL'),
    ('GLU', 'Glucose', 'mg/dL'),
    ('ALB', 'Albumin', 'g/dL') ON CONFLICT (id) DO NOTHING;

CREATE TABLE
    results (
        id SERIAL,
        marker_id VARCHAR(255) NOT NULL,
        value VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        abnormal BOOLEAN NOT NULL,
        user_id INTEGER NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    docs (
        id SERIAL,
        title VARCHAR(255),
        date DATE,
        url VARCHAR(255) NOT NULL,
        user_id INTEGER NOT NULL,
        PRIMARY KEY (id)
    );