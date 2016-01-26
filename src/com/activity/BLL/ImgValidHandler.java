package com.activity.BLL;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class ImgValidHandler extends HttpServlet {
	private int imgWidth = 200;

	private int imgHeight = 80;

	private int codeCount = 5;

	private int x = 0;

	private int fontHeight;

	private int codeY;

	private String fontStyle="Times New Roman";

	/**
	 * ��ʼ�����ò���
	 */
	public void init() throws ServletException {
		x = imgWidth / (codeCount + 1);
		fontHeight = imgHeight - 2;
		codeY = imgHeight - 12;
	}

	/**
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("image/jpeg");
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		HttpSession session = request.getSession();

		// ���ڴ��д���ͼ��
		BufferedImage image = new BufferedImage(imgWidth, imgHeight,
				BufferedImage.TYPE_INT_RGB);

		// ��ȡͼ��������
		Graphics2D g = image.createGraphics();

		// ��������
		Random random = new Random();

		// �趨����ɫ
		g.setColor(Color.WHITE);
		g.fillRect(0, 0, imgWidth, imgHeight);

		// �趨����
		g.setFont(new Font(fontStyle, Font.PLAIN + Font.ITALIC, fontHeight));

		// ���߿�
		g.setColor(new Color(55, 55, 12));
		g.drawRect(0, 0, imgWidth - 1, imgHeight - 1);

		float alpha = 0.2f; // ͸����     
        //g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, alpha)); 

		g.setColor(getRandColor(160, 200));
		
		// ȡ���������֤��(4λ����)
		String sRand = "";
		int red = 0, green = 0, blue = 0;
		for (int i = 0; i < codeCount; i++) {
			red = random.nextInt(255);
			green = random.nextInt(255);
			blue = random.nextInt(255);
			int wordType = random.nextInt(2);
			char retWord = 0;
			switch (wordType) {
			case 0:
				retWord = this.getSingleNumberChar();
				break;
			case 1:
				retWord = this.getLowerOrUpperChar(1);
				break;
			case 2:
				retWord = this.getLowerOrUpperChar(0);
				break;
			}
			sRand += String.valueOf(retWord);
			//g.setColor(new Color(red, green, blue));
			
			g.drawString(String.valueOf(retWord), 20+((i) * x-5), codeY);

		}
		

		g.fillRect(5, 30, 180, 5);
		g.fillRect(5, 50, 180, 5);

		

		// ������155�������ߣ�ʹͼ���е���֤�벻�ױ��������̽�⵽
		for (int i = 0; i < 160; i++) {
			int x = random.nextInt(imgWidth);
			int y = random.nextInt(imgHeight);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			g.drawLine(x, y, x + xl, y + yl);
		}
		
		// ����֤�����SESSION
		session.setAttribute("IMGVALID", sRand);
		// ͼ����Ч
		g.dispose();
		ServletOutputStream responseOutputStream = response.getOutputStream();
		// ���ͼ��ҳ��
		ImageIO.write(image, "JPEG", responseOutputStream);

		// ���¹ر���������
		responseOutputStream.flush();
		responseOutputStream.close();
	}

	Color getRandColor(int fc, int bc) {// ��Χ��������ɫ
		Random random = new Random();
		if (fc > 255)
			fc = 255;
		if (bc > 255)
			bc = 255;
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	private char getSingleNumberChar() {
		Random random = new Random();
		int numberResult = random.nextInt(10);
		int ret = numberResult + 48;
		return (char) ret;
	}

	private char getLowerOrUpperChar(int upper) {
		Random random = new Random();
		int numberResult = random.nextInt(26);
		int ret = 0;
		if (upper == 0) {// Сд
			ret = numberResult + 97;
		} else if (upper == 1) {// ��д
			ret = numberResult + 65;
		}
		return (char) ret;
	}
}
