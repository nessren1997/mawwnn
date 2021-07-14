export const responsive_constant = { xl: 18, lg: 20, md: 22, xs: 22 };

export const backGroundShadow: {
  style: React.CSSProperties;
} = {
  style: {
    backgroundColor: '#fff',
    boxShadow:
      ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    // boxShadow: "-1px 3px 10px -1px #ccc",
    // width:"500px"
  },
};

export const styledInput: {
  style: React.CSSProperties;
} = {
  style: {
    borderRadius: 30,
    border: '1px solid #8d2cd3',
    outline: 'none',
    height: '50px',
    padding: '10px 20px',
  },
};

export const styledInputNotBorderd: {
  style: React.CSSProperties;
} = {
  style: {
    borderRadius: 20,
    outline: 'none',
    height: '41px',
  },
};

export const styledButtom: {
  style: React.CSSProperties;
} = {
  style: {
    width: 142,
    backgroundColor: '#3f428f',
    color: '#fff',
    borderRadius: 30,
    outline: 'none',
    border: 0,
    fontWeight: 'bold',
  },
};
